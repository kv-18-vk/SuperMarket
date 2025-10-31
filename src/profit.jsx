import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell,ResponsiveContainer
} from "recharts";

const Report = () => {
  const [summary, setSummary] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [dateData, setDateData] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [expandedChart, setExpandedChart] = useState(null);



  const getDefaultDates = () => {
    const today = new Date();
    const past = new Date();
    past.setDate(today.getDate() - 30);
    const toDate = today.toISOString().split("T")[0];
    const fromDate = past.toISOString().split("T")[0];
    return { fromDate, toDate };
  };

  const fetchData = (f = from, t = to) => {
    fetch('https://supermarket-backend-f5yc.onrender.com/api/profits/byDateRange', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from: f, to: t })
    })
    .then(res => res.json())
    .then(data => {
        setDateData(
            data.map(item => ({
                ...item,
                date: new Date(item.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric", 
                }),
                profit: Number(item.profit)
            }))
        )
    })
    .catch(err => console.error("Error fetching date data:", err));

    fetch('https://supermarket-backend-f5yc.onrender.com/api/profits/summary', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from: f, to: t })
    })
    .then(res => res.json())
    .then(data => setSummary(data))
    .catch(err => console.error("Error fetching summary data:", err));

    fetch('https://supermarket-backend-f5yc.onrender.com/api/profits/byCategory', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from: f, to: t })
    })
    .then(res => res.json())
    .then(data => {
        setCategoryData(
            data.map(item => ({
                ...item,
                profit: Number(item.profit)
            }))
        );
    })
    .catch(err => console.error("Error fetching category data:", err));

    fetch('https://supermarket-backend-f5yc.onrender.com/api/profits/byProduct', {
        method: "POST",
        headers: { "Content-Type": "application/json" },    
        body: JSON.stringify({ from: f, to: t })
    })
    .then(res => res.json())
    .then(data => setProductData(data))
    .catch(err => console.error("Error fetching product data:", err));

  };

  useEffect(() => {
    const { fromDate, toDate } = getDefaultDates();
    setFrom(fromDate);
    setTo(toDate);
    fetchData(fromDate, toDate);
  }, []);

  const handleFilter = () => {
    if (!from || !to) return alert("Select date range!");
    fetchData(from, to);
  };

  return (
    <div className="profit-page">
      <h1>📊 Profit Dashboard</h1>

      
      <div className="filter-section">
        <label>From:</label>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        <label>To:</label>
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        <button onClick={handleFilter}>Apply Filter</button>
      </div>

      
      <div className="summary-cards">
        <div className="card">
          <h3>Total Expenses</h3>
          <p>₹{summary.total_cost || 0}</p>
        </div>
        <div className="card">
          <h3>Total Revenue</h3>
          <p>₹{summary.total_revenue || 0}</p>
        </div>
        <div className="card profit">
          <h3>Total Profit</h3>
          <p>₹{summary.total_profit || 0}</p>
        </div>
      </div>

      
      <div className="charts-container">
        <div className="chart-card" onClick={()=>setExpandedChart("bar")}>
          <h3>Profit by Category</h3>
          <BarChart width={450} height={250} data={categoryData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="profit" fill="#82ca9d" />
          </BarChart>
        </div>

        <div className="chart-card" onClick={()=>setExpandedChart("line")}>
          <h3>Profit Trend (By Date)</h3>
          <LineChart width={450} height={250} data={dateData}>
            <XAxis dataKey="date" tickMargin={10} padding={{ left: 20 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="profit" strokeLinecap="#8884d8" />
          </LineChart>
        </div>

        <div className="chart-card" onClick={()=>setExpandedChart("pie")}>
          <h3>Category Contribution</h3>
          <ResponsiveContainer width={400} height={250}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="profit"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#8884d8"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
            >
              {categoryData.map((_, index) => (
                <Cell key={index} fill={["#0088FE", "#0b715fff", "#FFBB28", "#FF8042","#65f3b8ff","#9035beff","#be525eff"][index % 7]} />
              ))}
            </Pie>
          </PieChart>
          <Legend/>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="table-section">
        <h3>Profit by Product</h3>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Cost</th>
              <th>Revenue</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((p) => (
              <tr key={p.product_id}>
                <td>{p.product_name}</td>
                <td>₹{p.cost}</td>
                <td>₹{p.revenue}</td>
                <td className={p.profit >= 0 ? "pos" : "neg"}>₹{p.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {expandedChart && (
        <div className="fullscreen-modal" onClick={() => setExpandedChart(null)}>
            {expandedChart === 'bar' && (
                <div>
                <h3>Profit by Category</h3>
                <BarChart width={900} height={400} data={categoryData}>
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="profit" fill="#82ca9d" />
                </BarChart>
                </div>
            )}
            {expandedChart === 'line' && (
                <div>
                    <h3>Profit Trend (By Date)</h3>
                    <LineChart width={900} height={400} data={dateData}>
                        <XAxis dataKey="date" tickMargin={10} padding={{left:30}} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="profit" strokeLinecap="#8884d8" />
                    </LineChart>
                </div>
            )}
            {expandedChart === 'pie' && (
                <div>
                    <h3>Category Contribution</h3>
                    <ResponsiveContainer width={900} height={500}>
                    <PieChart>
                        <Pie
                        data={categoryData}
                        dataKey="profit"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                        >
                        {categoryData.map((_, index) => (
                            <Cell key={index} fill={["#0088FE", "#124b6aff", "#FFBB28", "#FF8042","#0e3c29ff","#9035beff","#be525eff"][index % 7]} />
                        ))}
                        </Pie>
                    </PieChart>
                    <Legend/>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
        )}


    </div>
  );
};

export default Report;

