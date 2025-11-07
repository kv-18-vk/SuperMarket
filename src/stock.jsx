import { useState,useEffect } from "react";
import { useAuth } from "./auth";
import bg from "./assets/STOCK.png"

function Stock() {

    const { logout, userName } = useAuth();

    const [activeTab, setActiveTab] = useState("present");
    const [menuOpen, setMenuOpen] = useState(false);

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

    function toggleUserMenu(){
        setMenuOpen(!menuOpen);
    }

    return (
        <div className="stockpage">
            <div className="first-view">
                <img src={bg} alt="Background" className="bg-image" />
                <div>
                    <div className="heading-space stock">
                        <h1>Stock</h1>
                        <div className="home-header report">
                            <div className="home-nav">
                                <div className="home-nav-item">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                                    </svg>
                                    Stock Page
                                </div>

                                <div className="home-user-menu">
                                    <div className="user-avatar-wrapper" onClick={()=>toggleUserMenu()}>
                                        <div className="user-avatar">
                                            <svg viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="8" r="4" fill="#5E4030"/>
                                                <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" fill="#5E4030"/>
                                                <circle cx="12" cy="8" r="3.5" fill="#8B6F47"/>
                                                <ellipse cx="10" cy="7.5" rx="0.8" ry="1" fill="#2D1810"/>
                                                <ellipse cx="14" cy="7.5" rx="0.8" ry="1" fill="#2D1810"/>
                                                <path d="M10.5 9c.5.3 1 .5 1.5.5s1-.2 1.5-.5" stroke="#8B6F47" strokeWidth="0.5" strokeLinecap="round"/>
                                            </svg>
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
                        </div>
                    </div>
                    <div className="top-navigation">
                        <button
                            className={activeTab === "present" ? "active" : ""}
                            onClick={() => setActiveTab("present")}
                        >
                            <i className="fas fa-box"></i> Present Stock
                        </button>
                        <button
                            className={activeTab === "expired" ? "active" : ""}
                            onClick={() => setActiveTab("expired")}
                        >
                            <i className="fas fa-ban"></i> Expired Stock
                        </button>
                    </div>
                    {activeTab === "expired" && (
                            <div className="dashboard-header">
                                <div>
                                    <h2>Expired Stock</h2>
                                    <p>History of Expired Products</p>
                                </div>
                            </div>
                    )}
                    {activeTab === "present" && (
                            <div className="dashboard-header">
                                <div>
                                    <h2>Present Stock</h2>
                                    <p>Manage all available products</p>
                                </div>
                            </div>
                    )}
                </div>
            </div>

            <div className="main-content">
                <div className="content-area">
                    {activeTab === "present" && (
                        <div>
                            <div className="stocks-container">
                                {products.map((p, idx) => (
                                    <div className="stock-card" key={idx}>
                                        <h3>Product ID: {p.product_id}</h3>
                                        <p><strong>Product Name:</strong> {p.product_name}</p>
                                        <p><strong>Quantity:</strong> {p.quantity_present}</p>
                                        <p><strong>SP:</strong> {p.sp}</p>
                                        <p><strong>Discount:</strong> {p.discount_in_percent}%</p>
                                        <p><strong>Expiry Date:</strong> {p.expiry_date ? p.expiry_date.toString().split('T')[0] : "N/A"}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === "expired" && (
                        <div>
                            <div className="stocks-container">
                                {expired.map((p, idx) => (
                                    <div className="stock-card" key={idx}>
                                        <h3>Product ID: {p.product_id}</h3>
                                        <p><strong>Date Expired:</strong> {p.date_expired.toString().split('T')[0]}</p>
                                        <p><strong>Quantity Expired:</strong> {p.quantity_expired}</p>
                                        <p><strong>Loss:</strong> <span className="exp-loss-red">{p.loss}</span></p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Stock