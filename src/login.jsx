import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth';
import { useEffect } from 'react';

function Login() {
    const {authenticated,login} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(authenticated){
            navigate('/home');
        }  
    }, [authenticated, navigate]);

    function submit(){

        const employee_id=document.getElementById('employeeId').value.trim();
        const employee_password=document.getElementById('password').value.trim();
        if(!employee_id || !employee_password){
            alert("Please fill all the fields");
            return;
        }
        fetch('https://supermarket-backend-f5yc.onrender.com/login',{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({employee_id:employee_id,password:employee_password})
        }).then(res=>res.json()).then(data=>{
            if(data.msg==="Valid"){
                alert("Login Successful");
                login(employee_id,data.name, data.designation);
            }
            else if(data.msg==="Invalid"){
                alert("Invalid ID or Password");
            }
            else{
                alert(data);
            }
        }).catch(err=>console.log(err));

    }

    return (
        <div className="loginpage">
            <div className='login-logo'>
                <div className="login-icon">
                        <i className="fas fa-cart-shopping"></i>
                </div>
                <div className="login-text">
                    <h1>DataMart</h1>
                    <p>Smart Management, Seamless Operations</p>
                </div>
            </div>
            <div className="login-container">
                <h2>Employee Login</h2>
                <div className="input-group">
                    <label>Employee_ID</label>
                    <input type="text" id="employeeId" placeholder="Enter your Employee_ID" required/>
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" id="password" placeholder="Enter your Password" required/>
                </div>
                <button type="submit" className="login-btn" onClick={()=>{submit()}}>Login</button>
            </div>
        </div>
    )
}


export default Login