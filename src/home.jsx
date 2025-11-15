import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './auth';
import usericon from './assets/user.png';

function Home() {
    const navigate = useNavigate();
    const {logout,userName,designation} = useAuth();
    const access = {
        stock: designation!== "Cashier",
        report: designation!== "Cashier",
        delivery: designation!== "Cashier",
        staff: designation === "Admin"
    }

    const [menuOpen, setMenuOpen] = useState(false);
    function toggleUserMenu(){
        setMenuOpen(!menuOpen);
    }

    return (
        <div className="home">
            <div className='container'>
                <header className="home-header">
                    <div className="home-nav">
                        <div className="home-nav-item">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                            </svg>
                            HOME PAGE
                        </div>

                        <div className="home-user-menu">
                            <div className="user-avatar-wrapper" onClick={()=>toggleUserMenu()}>
                                <div className="user-avatar">
                                    <img src={usericon}></img>
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

                <main className="home-dashboard-grid">
                    {access.delivery && (
                    <div className="home-dashboard-card" onClick={()=>navigate('/home/delivery')}>
                        <div className="home-card-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                            </svg>
                        </div>
                        <h2 className="home-card-title">DELIVERY</h2>
                        <p className="home-card-description">Manage delivery schedules, track shipments, and coordinate with delivery personnel.</p>
                    </div>
                    )}

                    <div className="home-dashboard-card" onClick={()=>navigate('/home/billing')}>
                        <div className="home-card-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path>
                            </svg>
                        </div>
                        <h2 className="home-card-title">BILLING</h2>
                        <p className="home-card-description">Generate invoices, process payments, and manage financial transactions seamlessly.</p>
                    </div>

                    {access.stock && (
                    <div className="home-dashboard-card" onClick={()=>navigate('/home/stock')}>
                        <div className="home-card-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                            </svg>
                        </div>
                        <h2 className="home-card-title">STOCK</h2>
                        <p className="home-card-description">Monitor inventory levels, track stock movements, and manage product availability.</p>
                    </div>
                    )}

                    {access.staff && (
                    <div className="home-dashboard-card" onClick={()=>navigate('/home/staff')}>
                        <div className="home-card-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                        </div>
                        <h2 className="home-card-title">EMPLOYEE</h2>
                        <p className="home-card-description">Manage employee records, schedules, attendance, and performance tracking.</p>
                    </div>
                    )}

                    {access.report && (
                    <div className="home-dashboard-card" onClick={()=>navigate('/home/report')}>
                        <div className="home-card-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                        </div>
                        <h2 className="home-card-title">PROFITS</h2>
                        <p className="home-card-description">Analyze revenue, expenses, profit margins, and financial performance metrics.</p>
                    </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default Home