import { useEffect } from "react";
import { useState} from "react";
import { useAuth } from "./auth";

function Staff() {

    const {userName,logout} = useAuth();
    const [employees,setData] = useState([]);
    
    useEffect(() => {
        fetch('https://supermarket-backend-f5yc.onrender.com/staff')
            .then(res => res.json())
            .then(data => {
                setData(data);  
            })
            .catch(error => console.error('Error fetching employee data:', error));
    }, []);

    function handleAdd() {
        document.querySelector('.add-employee-form').classList.toggle('hide');
        document.querySelector('.edit-employee-form').classList.add('hide');
        document.querySelector('.delete-employee-form').classList.add('hide');
    }
    function handleEdit() {
        document.querySelector('.edit-employee-form').classList.toggle('hide');
        document.querySelector('.add-employee-form').classList.add('hide');
        document.querySelector('.delete-employee-form').classList.add('hide');
    }
    function handleDelete() {
        document.querySelector('.delete-employee-form').classList.toggle('hide');
        document.querySelector('.edit-employee-form').classList.add('hide');
        document.querySelector('.add-employee-form').classList.add('hide');
    }
    function AddEmployee(){
        const employee_id=document.querySelector('.add-employee-inputs input:nth-child(1)');
        const name=document.querySelector('.add-employee-inputs input:nth-child(2)');
        const designation=document.querySelector('.add-employee-inputs input:nth-child(3)');
        const Daily_wage=document.querySelector('.add-employee-inputs input:nth-child(4)');
        const password=document.querySelector('.add-employee-inputs input:nth-child(5)');
        if(!employee_id.value || !name.value || !designation.value || !Daily_wage.value || !password.value){
            alert("Please fill all the fields");
            return;
        }
        fetch('https://supermarket-backend-f5yc.onrender.com/staff/addemployee',{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({employee_id:employee_id.value,name:name.value,designation:designation.value,Daily_wage:Daily_wage.value,password:password.value})
        }).then(res=>res.text()).then(data=>{
            alert(data);
            setTimeout(() => {window.location.reload();}, 500);
        }).catch(err=>console.log(err));
        handleAdd();
        employee_id.value="";
        name.value="";
        designation.value="";
        Daily_wage.value="";
        password.value="";
    }
    function DeleteEmployee(){
        const employee_id=document.querySelector('.delete-employee-inputs input:nth-child(2)');
        fetch('https://supermarket-backend-f5yc.onrender.com/staff/deleteemployee',{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({employee_id:employee_id.value})
        }).then(res=>res.text()).then(data=>{
            alert(data);
            setTimeout(() => {window.location.reload();}, 500);
        }).catch(err=>console.log(err));
        handleDelete();
        employee_id.value="";
    }
    return (
        <div className="staffpage">
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
            <div className="staff-container">
                <table className="staff-table">
                    <thead className="staff-header">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Salary ($)</th>
                        </tr>
                    </thead>
                    <tbody className="staff-list">
                        {employees.map((emp,i) => (
                            <tr key={i}>
                                <td>{emp.employee_id}</td>
                                <td>{emp.name}</td>
                                <td>{emp.designation}</td>
                                <td>{emp.Daily_wage}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="staff-buttons-bar">
                <button className="staff-button" onClick={handleAdd}>Add</button>
                <button className="staff-button" onClick={handleEdit}>Edit</button>
                <button className="staff-button" onClick={handleDelete}>Delete</button>
            </div>
            <div className="add-employee-form hide">
                <div className="add-employee-inputs">
                    <input type="number" placeholder="Employee_ID"></input>
                    <input type="text" placeholder="Name"></input>
                    <input type="text" placeholder="Designation"></input>
                    <input type="number" placeholder="Daily_wage"></input>
                    <input type="password" placeholder="Password"></input>
                </div>
                <button onClick={AddEmployee}>Submit</button>
            </div>
            <div className="edit-employee-form hide">
                <p>Select Employee_ID: </p>
            </div>
            <div className="delete-employee-form hide">
                <div className="delete-employee-inputs">
                    <p>Select Employee_ID: </p>
                    <input type="number" placeholder="Employee_ID"></input>
                </div>
                <button onClick={DeleteEmployee}>Delete</button>
            </div>
        </div>
    )
}

export default Staff