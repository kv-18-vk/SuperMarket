import { useState,useEffect } from "react";
import { useAuth } from "./auth";


function Stock() {

    const { logout, userName } = useAuth();

    const [activeTab, setActiveTab] = useState("present");

  const [products, setproducts] = useState([]);
  const [expired, setexpired] = useState([]);


  useEffect(()=>{
        if(activeTab == "present"){
            fetch('https://supermarket-backend-f5yc.onrender.com/stock')
                .then(res=>res.json())
                .then(data=>{setproducts(data);})
                .catch(err=> console.error('error fetching data :',err));
        }
        else if(activeTab == "expired"){
            fetch('https://supermarket-backend-f5yc.onrender.com/expired')
                .then(res=>res.json())
                .then(data=>{setexpired(data);})
                .catch(error=> console.error('error fetching data:',error));
        }
    },[activeTab])


    return (
        <div className="stockpage">
            <div className="header">
                <div className="header-content">
                    <div className="logo">
                        <div className="logo-icon">
                        <i className="fas fa-cart-shopping"></i>
                        </div>
                        <div className="logo-text">
                        <h1>DataMart</h1>
                        <p>Smart Management, Seamless Operations</p>
                        </div>
                    </div>

                    <nav>
                        <ul>
                        <li><a href="#"><i className="fas fa-home"></i> Home</a></li>
                        <li><a href="#"><i className="fas fa-chart-line"></i> Reports</a></li>
                        <li><a href="#"><i className="fas fa-cog"></i> Settings</a></li>
                        <li><a href="#"><i className="fas fa-question-circle"></i> Help</a></li>
                        </ul>
                    </nav>

                    <div className="user-actions">
                        <button><i className="fas fa-bell"></i></button>
                        <button onClick={() => logout()}>
                        <i className="fas fa-user"></i>
                        <span id="user_name">{userName}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="main-content">
                <div className="sidebar" aria-label="Stock navigation">
                    <button
                        className={activeTab === "present" ? "active" : ""}
                        onClick={() => setActiveTab("present")}
                    >
                        <i className="fas fa-box"></i> Stock Present
                    </button>
                    <button
                        className={activeTab === "expired" ? "active" : ""}
                        onClick={() => setActiveTab("expired")}
                    >
                        <i className="fas fa-ban"></i> Expired Stock
                    </button>
                </div>

                <div className="content-area">
                {activeTab === "present" && (
                    <div>
                        <div className="dashboard-header">
                            <h2>Present Stock</h2>
                            <p>Manage all available products</p>
                        </div>

                        <table className="delivery-table" id="present-table" aria-label="Present stock table">
                            <thead>
                                <tr>
                                <th>Product Name</th>
                                <th>Quantity Present</th>
                                <th>SP</th>
                                <th>Discount(%)</th>
                                <th>Expiry Date</th>
                                </tr>
                            </thead>
                            <tbody>
                            {products.map((p,idx)=>(
                                <tr key={idx}>
                                    <td>{p.product_name}</td>
                                    <td>{p.quantity_present}</td>
                                    <td>{p.sp}</td>
                                    <td>{p.discount_in_percent}</td>
                                    <td>{p.expiry_date ? p.expiry_date.toString().split('T')[0] : "N/A"}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === "expired" && (
                    <div>
                        <div className="dashboard-header">
                            <h2>Expired Stock</h2>
                            <p>Products no longer available for sale</p>
                        </div>

                        <table className="delivery-table" id="expired-table" aria-label="Expired stock table">
                            <thead>
                                <tr>
                                <th>Date</th>
                                <th>Product ID</th>
                                <th>Quantity Expired</th>
                                <th>Loss</th>
                                </tr>
                            </thead>
                            <tbody>
                            {expired.map((p,idx)=>(
                                <tr key={idx}>
                                    <td>{p.date_expired.toString().split('T')[0]}</td>
                                    <td>{p.product_id}</td>
                                    <td>{p.quantity_expired}</td>
                                    <td>{p.loss}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
                </div>
            </div>
        </div>
    )
}

export default Stock