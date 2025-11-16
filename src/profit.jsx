import { useState, useEffect } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell,ResponsiveContainer
} from "recharts";
import { useAuth } from './auth';
import usericon from './assets/user.png';
import bg from "./assets/PROFITS.png";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io("https://supermarket-backend-f5yc.onrender.com");
const Report = () => {
  const navigate = useNavigate();
  const {logout,userName,designation} = useAuth();
  const [summary, setSummary] = useState({});
  const [loss_summary , setLossSummary] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [lossCategoryData, setLossCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [lossProductData, setLossProductData] = useState([]);
  const [dateData, setDateData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [expandedChart, setExpandedChart] = useState(null);
  const [availableYears, setAvailableYears] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  const [menuOpen, setMenuOpen] = useState(false);
    function toggleUserMenu(){
        setMenuOpen(!menuOpen);
    }

  const getDefaultDates = () => {
    const today = new Date();
    const past = new Date();
    past.setDate(today.getDate() - 30);
    const toDate = today.toISOString().split("T")[0];
    const fromDate = past.toISOString().split("T")[0];
    return { fromDate, toDate };
  };

  const fetchMonthlyData = (year) => {
    fetch('https://supermarket-backend-f5yc.onrender.com/report/monthly-stats', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year })
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        alert(error);
        navigate('/home');
      }
      setMonthlyData(data);})
    .catch(err => console.error("Error fetching monthly data:", err));
  };
  const fetchData = (f = from, t = to) => {

    fetch('https://supermarket-backend-f5yc.onrender.com/api/profits/byDateRange', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from: f, to: t })
    })
    .then(res => res.json())
    .then(data => {
        if(data.error){
            console.error("Error in date data response:", data.error);
            return;
        }
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
    .then(data => {
      if(data.error){
        console.error("Error in summary data response:", data.error);
        return;
      }
      setSummary(data);})
    .catch(err => console.error("Error fetching summary data:", err));

    fetch('https://supermarket-backend-f5yc.onrender.com/api/profits/byCategory', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from: f, to: t })
    })
    .then(res => res.json())
    .then(data => {
        if(data.error){
          console.error("Error in category data response:", data.error);
          return;
        }
        setCategoryData(
            data.map(item => ({
                ...item,
                profit: Number(item.profit)
            }))
        );
    })
    .catch(err => console.error("Error fetching category data:", err));

    fetch('https://supermarket-backend-f5yc.onrender.com/api/loss/summary', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from: f, to: t })
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        console.error("Error:" , data.error);
        return;
      }
      setLossSummary(data);})
    .catch(err => console.error("Error fetching summary data:", err));

    fetch('https://supermarket-backend-f5yc.onrender.com/api/loss/byCategory', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from: f, to: t })
    })
    .then(res => res.json())
    .then(data => {
        if(data.error){
          console.error("error:" , data.error);
          return;
        }
        setLossCategoryData(
            data.map(item => ({
                ...item,
                total_loss: Number(item.total_loss)
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
    .then(data => {
      if(data.error){
          console.error("error:" , data.error);
          return;
        }
      setProductData(data);})
    .catch(err => console.error("Error fetching product data:", err));

    fetch('https://supermarket-backend-f5yc.onrender.com/api/loss/byProduct', {
        method: "POST",
        headers: { "Content-Type": "application/json" },    
        body: JSON.stringify({ from: f, to: t })
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
          console.error("error:" , data.error);
          return;
        }
      setLossProductData(data);})
    .catch(err => console.error("Error fetching product data:", err));

  };

  function load_data(){
    fetch('https://supermarket-backend-f5yc.onrender.com/report/yearly-stats', {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
          console.error("error:" , data.error);
          return;
        }
      setYearlyData(data);
      const years = data.map((d) => d.year);
      setAvailableYears(years);
      if (!years.includes(year)) setYear(years[years.length - 1]);
    })
    .catch(err => console.error("Error fetching yearly data:", err));

    fetchMonthlyData(year);

    const { fromDate, toDate } = getDefaultDates();
    setFrom(fromDate);
    setTo(toDate);
    fetchData(fromDate, toDate);
  }

  useEffect(() => {
    load_data();
  }, []);

  useEffect(()=>{
    socket.on("stockUpdated", () => {
        load_data();
    });
    return () => {
        socket.off("stockUpdated");
    };
  },[]);

  const handleFilter = () => {
    if (!from || !to) return alert("Select date range!");
    fetchData(from, to);
  };

  return (
    <div className="profit-page">
      <div className="first-view">
        <img src={bg} alt="Background" className="bg-image" />
        <div>
            <div className="heading-space">
              <header className="home-header report">
                <div className="home-nav">
                    <div className="home-nav-item">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                        REPORT PAGE
                    </div>

                    <div className="home-user-menu">
                        <div className="user-avatar-wrapper" onClick={()=>toggleUserMenu()}>
                            <div className="user-avatar">
                                <div className="user-avatar">
                                    <img src={usericon}></img>
                                </div>
                            </div>
                            <span className="admin-label">{userName}</span>
                        </div>
                        <div className={!menuOpen ? "home-user-info" : "home-user-info active"} id="userMenu">
                            <div className="home-menu-item" onClick={()=>logout()}>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                </svg>
                                Logout
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <h1>Analytics Dashboard</h1>
          </div>

          <div className="summary-cards">
            <div className="card">
              <h3>Total Saled Expenses</h3>
              <p>₹{summary.total_cost || 0}</p>
            </div>
            <div className="card">
              <h3>Total Saled Revenue</h3>
             
              <p>₹{summary.total_revenue || 0}</p>
              
            </div>
            <div className="card profit">
              <h3>Total Sales Profit</h3>
              
              <p>₹{summary.total_profit || 0}</p>
              
            </div>
            <div className="card loss">
              <h3>Total Expired Loss </h3>
              
              <p>₹{loss_summary.total_loss || 0}</p>
              
            </div>
          </div>
          <div className="filter-section">
            <label>From:</label>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            <label>To:</label>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
            <button onClick={handleFilter}>Apply Filter</button>
          </div>
        </div>
      </div>
      
      <div className="charts-container">
        <div className="chart-card profit" onClick={()=>setExpandedChart("bar")}>
          <h3>Sales Profit by Category</h3>
          {Array.isArray(categoryData) && (
          <BarChart width={450} height={250} data={categoryData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="profit" fill="#82ca9d" name="sales-profit" />
          </BarChart>
          )}
        </div>

        <div className="chart-card profit" onClick={()=>setExpandedChart("line")}>
          <h3>Profit Trend (By Date)</h3>
          {Array.isArray(dateData) && (
          <LineChart width={450} height={250} data={dateData}>
            <XAxis dataKey="date" tickMargin={10} padding={{ left: 20 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="profit" strokeLinecap="#8884d8" name="sales-profit" />
          </LineChart>
          )}
        </div>

        <div className="chart-card profit" onClick={()=>setExpandedChart("pie")}>
          <h3>Sales Profit - Category Contribution</h3>
          {Array.isArray(categoryData) && (
          <ResponsiveContainer width={450} height={250}>
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
          )}
        </div>

        <div className="chart-card loss" onClick={()=>setExpandedChart("loss-bar")}>
          <h3>Expired Loss by Category</h3>
          {Array.isArray(lossCategoryData) && (
          <BarChart width={450} height={250} data={lossCategoryData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_loss" fill="#c34f4fff" name="expired-loss" />
          </BarChart>
          )}
        </div>

        <div className="chart-card loss" onClick={()=>setExpandedChart("loss-pie")}>
          <h3>Expired Loss Category Contribution</h3>
          {Array.isArray(lossCategoryData) && (
          <ResponsiveContainer width={450} height={250}>
          <PieChart>
            <Pie
              data={lossCategoryData}
              dataKey="total_loss"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#8884d8"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
            >
              {categoryData.map((_, index) => (
                <Cell key={index} fill={["#FFBB28","#0088FE","#9035beff", "#0f9c74ff",  "#c25e2cff","#50af88ff","#be525eff"][index % 7]} />
              ))}
            </Pie>
          </PieChart>
          <Legend/>
          </ResponsiveContainer>
          )}
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
            { Array.isArray(productData) && productData.map((p) => (
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
      <div className="table-section">
        <h3>Expired Loss by Product</h3>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity Expired</th>
              <th>Total Loss</th>
            </tr>
          </thead>
          <tbody>
            { Array.isArray(lossProductData) && lossProductData.map((p) => (
              <tr key={p.product_id}>
                <td>{p.product_name}</td>
                <td>{p.quantity_expired}</td>
                <td className="neg">₹{p.total_loss}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="filter-section">
        <label>Select Year:</label>
        <select
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
            fetchMonthlyData(year);
          }}
        >
          { Array.isArray(availableYears) && availableYears.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      <div className="charts-container">
        <div className="chart-card stats" onClick={()=>setExpandedChart("monthly-bar")}>
          <h3>Monthly Stats - {year}</h3>
          {Array.isArray(monthlyData) && (
          <BarChart width={600} height={300} data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_profit" fill="#4CAF50" name="Sales-Profit" />
            <Bar dataKey="total_loss" fill="#F44336" name="Expired-Loss" />
          </BarChart>
          )}
        </div>
        <div className="chart-card stats" onClick={()=>setExpandedChart("yearly-bar")}>
          <h3>Yearly Stats</h3>
          {Array.isArray(yearlyData) && (
          <BarChart width={600} height={300} data={yearlyData}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_profit" fill="#4CAF50" name="Total Profit" />
            <Bar dataKey="total_loss" fill="#F44336" name="Expired Loss" />
          </BarChart>
          )}
        </div>
      </div>

      {expandedChart && Array.isArray(categoryData) && Array.isArray(dateData) && Array.isArray(lossCategoryData) && Array.isArray(lossProductData) && Array.isArray(productData) && Array.isArray(availableYears) && Array.isArray(monthlyData) && Array.isArray(yearlyData) && (
        <div className="fullscreen-modal" onClick={() => setExpandedChart(null)}>
            {expandedChart === 'bar' && (
                <div>
                <h3>Sales Profit by Category</h3>
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
                    <h3>Sales Profit - Category Contribution</h3>
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
            {expandedChart === 'loss-bar' && (
              <div>
                <h3>Expired Loss by Category</h3>
                <BarChart width={900} height={400} data={lossCategoryData}>
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total_loss" fill="#c34f4fff" />
                </BarChart>
              </div>
            )}
            {expandedChart === 'loss-pie' && (
              <div>
                <h3>Expired Loss Category Contribution</h3>
                <ResponsiveContainer width={900} height={500}>
                <PieChart>
                  <Pie
                    data={lossCategoryData}
                    dataKey="total_loss"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={index} fill={["#FFBB28","#0088FE","#9035beff", "#0f9c74ff",  "#c25e2cff","#50af88ff","#be525eff"][index % 7]} />
                    ))}
                  </Pie>
                </PieChart>
                <Legend/>
                </ResponsiveContainer>
              </div>
            )}
            {expandedChart === 'monthly-bar' && (
              <div>
              <h3>Monthly Stats - {year}</h3>
              <BarChart width={900} height={400} data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_profit" fill="#4CAF50" name="Sales-Profit" />
                <Bar dataKey="total_loss" fill="#F44336" name="Expired-Loss" />
              </BarChart>
              </div>
            )}
            {expandedChart === 'yearly-bar' && (
              <div>
                <h3>Yearly Stats</h3>
                <BarChart width={900} height={400} data={yearlyData}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total_profit" fill="#4CAF50" name="Total Profit" />
                  <Bar dataKey="total_loss" fill="#F44336" name="Expired Loss" />
                </BarChart>
              </div>
            )}
        </div>
        )}


    </div>
  );
};

export default Report;

