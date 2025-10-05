import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { AuthProvider,useAuth } from './auth';
import Login from './login';
import './login.css';
import Home from './home';
import './home.css';
import Delivery from './delivery';
import './delivery.css';
import Billing from './billing';
import './billing.css';
import Stock from './stock';
import './stock.css';
import Staff from './employee';
import './employee.css';
import Report from './profit';
import './profit.css';


function Protect({ children }) {

    const { authenticated,loading } = useAuth();
    if(loading){
        return <div>loading.....</div>
    }
    return authenticated ? children : <Navigate to="/" />;
}


function App() {
    return (
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path='/home' element={<Protect><Home/></Protect>}/>
                    <Route path='/home/delivery' element={<Protect><Delivery/></Protect>}/>
                    <Route path='/home/billing' element={<Protect><Billing/></Protect>}/>
                    <Route path='/home/stock' element={<Protect><Stock/></Protect>}/>
                    <Route path='/home/staff' element={<Protect><Staff/></Protect>}/>
                    <Route path='/home/report' element={<Protect><Report/></Protect>}/>
                </Routes>
            </AuthProvider>
    )
}

export default App
