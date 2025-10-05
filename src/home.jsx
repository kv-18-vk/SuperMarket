import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth';

function Home() {
    const navigate = useNavigate();
    const {logout,userName,designation} = useAuth();
    
    const access = {
        stock: designation!== "cashier",
        report: designation!== "cashier",
        delivery: designation!== "cashier",
        staff: designation === "admin"
    }

    return (
        <div className="home">
            <div className='header'>
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
                        <button onClick={()=>logout()}><i className="fas fa-user"></i><span id="user_name">{userName}</span></button>
                    </div>
                </div>
            </div>
            
            <div className="dashboard">
                    <div className="dashboard-header">
                        <h2>Management Dashboard</h2>
                        <p>Access and manage all aspects of your mart operations from one centralized location</p>
                    </div>
                    
                    <div className="options-grid">
                        <div className="option-card active">
                            <div className="card-icon">🧾</div>
                            <h3>Billing</h3>
                            <p>Create customer bills, manage transactions, and view billing history</p>
                            <button className="card-button" onClick={()=>{navigate('/home/billing')}}>Access Billing</button>
                        </div>
                        
                        <div className={access.stock ? "option-card active" : "option-card disable"}>
                            <div className="card-icon">📦</div>
                            <h3>Stock Management</h3>
                            <p>Monitor inventory levels, track products, and manage stock</p>
                            <button className={access.stock ? "card-button" : "card-button disabled"} onClick={()=>{navigate('/home/stock')}} disabled={!access.stock}>Manage Stock</button>
                        </div>
                        
                        <div className={access.delivery ? "option-card active" : "option-card disable"}>
                            <div className="card-icon">🚚</div>
                            <h3>Delivery</h3>
                            <p>Schedule deliveries, track shipments, and manage suppliers</p>
                            <button className={access.delivery ? "card-button" : "card-button disabled"} onClick={()=>{navigate('/home/delivery')}} disabled={!access.delivery}>View Delivery</button>
                        </div>
                        
                        <div className={access.report ? "option-card active" : "option-card disable"}>
                            <div className="card-icon">📊</div>
                            <h3>Profit & Statistics</h3>
                            <p>Analyze sales data, view profits, and generate reports</p>
                            <button className={access.report ? "card-button" : "card-button disabled"} onClick={()=>{navigate('/home/report')}} disabled={!access.report}>View Reports</button>
                        </div>
                        
                        <div className={access.staff ? "option-card active" : "option-card disable"}>
                            <div className="card-icon">👥</div>
                            <h3>Employee & Staff</h3>
                            <p>Manage staff details, track attendance, and assign roles</p>
                            <button className={access.staff ? "card-button" : "card-button disabled"} onClick={()=>{navigate('/home/staff')}} disabled={!access.staff}>Manage Staff</button>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Home
