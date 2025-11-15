import { useEffect, useState } from "react";
import { useAuth } from "./auth";
import reportImage from "./assets/EMPLOYEE.png"; 
import { useNavigate } from "react-router-dom";
import usericon from './assets/user.png';

function Staff() {
    const { userName, logout } = useAuth();
    const [employees, setData] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('https://supermarket-backend-f5yc.onrender.com/staff')
            .then(res => res.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching employee data:', error);
                alert('Error fetching employee data : server error');
                navigate('/home');
            });
    }, []);

    function toggleUserMenu() {
        setMenuOpen(!menuOpen);
    }

    function handleAdd() {
        document.querySelector('.add-employee-form').classList.toggle('hide');
        document.querySelector('.edit-employee-form').classList.add('hide');
        document.querySelector('.delete-employee-form').classList.add('hide');
    }
    function handleEdit() {
        document.querySelector('.edit-employee-form').classList.toggle('hide');
        document.querySelector('.add-employee-form').classList.add('hide');
        document.querySelector('.delete-employee-form').classList.add('hide');
        
        setTimeout(() => {
            const idInputContainer = document.querySelector('.edit-employee-id-input');
            const employeeDataContainer = document.querySelector('.edit-employee-data');
            
            if (idInputContainer) {
                idInputContainer.style.display = 'flex';
            }
            if (employeeDataContainer) {
                employeeDataContainer.style.display = 'none';
            }
            
            const employeeIdInput = document.querySelector('.edit-employee-inputs input[placeholder="Employee_ID"]');
            if (employeeIdInput) {
                employeeIdInput.value = '';
            }
            
            const editInputs = document.querySelectorAll('.edit-employee-data input');
            editInputs.forEach(input => {
                input.value = '';
                input.disabled = true;
            });
        }, 10);
    }

    function fetchEmployeeData() {
        const employee_id = document.querySelector('.edit-employee-inputs input[placeholder="Employee_ID"]');
        if (!employee_id.value) {
            alert("Please enter an employee ID");
            return;
        }

        const employee = employees.find(emp => emp.employee_id == employee_id.value);
        
        if (!employee) {
            alert("Employee not found");
            return;
        }

        const idInputContainer = document.querySelector('.edit-employee-id-input');
        const employeeDataContainer = document.querySelector('.edit-employee-data');
        
        if (idInputContainer) {
            idInputContainer.style.display = 'none';
        }
        if (employeeDataContainer) {
            employeeDataContainer.style.display = 'flex';
        }

        const nameInput = document.querySelector('.edit-employee-data input[placeholder="Name"]');
        const designationInput = document.querySelector('.edit-employee-data input[placeholder="Designation"]');
        const wageInput = document.querySelector('.edit-employee-data input[placeholder="Daily Wage"]');
        const passwordInput = document.querySelector('.edit-employee-data input[placeholder="Password"]');
        const statusInput = document.querySelector('.edit-employee-data input[placeholder="Status"]');

        if (nameInput) nameInput.value = employee.name;
        if (designationInput) designationInput.value = employee.designation;
        if (wageInput) wageInput.value = employee.Daily_wage;
        if (passwordInput) passwordInput.value = employee.password;
        if (statusInput) statusInput.value = employee.status;

        if (nameInput) nameInput.disabled = false;
        if (designationInput) designationInput.disabled = false;
        if (wageInput) wageInput.disabled = false;
        if (passwordInput) passwordInput.disabled = false;
        if (statusInput) statusInput.disabled = false;
    }

    function EditEmployee() {
        const employee_id_input = document.querySelector('.edit-employee-inputs input[placeholder="Employee_ID"]');
        const name = document.querySelector('.edit-employee-data input[placeholder="Name"]');
        const designation = document.querySelector('.edit-employee-data input[placeholder="Designation"]');
        const Daily_wage = document.querySelector('.edit-employee-data input[placeholder="Daily Wage"]');
        const password = document.querySelector('.edit-employee-data input[placeholder="Password"]');
        const status = document.querySelector('.edit-employee-data input[placeholder="Status"]');
        
        const employee_id = employee_id_input.value;
        
        if (!employee_id || !name.value || !designation.value || !Daily_wage.value || !password.value || !status.value) {
            alert("Please enter employee data first");
            return;
        }
        
        const updateData = { employee_id: parseInt(employee_id) ,name: name.value, designation: designation.value, daily_wage: parseFloat(Daily_wage.value), password: password.value, status: status.value };

        fetch('https://supermarket-backend-f5yc.onrender.com/staff/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            setTimeout(() => { window.location.reload(); }, 100);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function handleDelete() {
        document.querySelector('.delete-employee-form').classList.toggle('hide');
        document.querySelector('.edit-employee-form').classList.add('hide');
        document.querySelector('.add-employee-form').classList.add('hide');
    }
    function AddEmployee() {
        const employee_id = document.querySelector('.add-employee-inputs input:nth-child(1)');
        const name = document.querySelector('.add-employee-inputs input:nth-child(2)');
        const designation = document.querySelector('.add-employee-inputs input:nth-child(3)');
        const Daily_wage = document.querySelector('.add-employee-inputs input:nth-child(4)');
        const password = document.querySelector('.add-employee-inputs input:nth-child(5)');
        if (!employee_id.value || !name.value || !designation.value || !Daily_wage.value || !password.value) {
            alert("Please fill all the fields");
            return;
        }
        fetch('https://supermarket-backend-f5yc.onrender.com/staff/addemployee', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ employee_id: employee_id.value, name: name.value, designation: designation.value, Daily_wage: Daily_wage.value, password: password.value })
        }).then(res => res.text()).then(data => {
            alert(data);
            setTimeout(() => { window.location.reload(); }, 500);
        }).catch(err => console.log(err));
        handleAdd();
        employee_id.value = "";
        name.value = "";
        designation.value = "";
        Daily_wage.value = "";
        password.value = "";
    }

    function DeleteEmployee() {
        const employee_id = document.querySelector('.delete-employee-inputs input:nth-child(2)');
        fetch('https://supermarket-backend-f5yc.onrender.com/staff/deleteemployee', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ employee_id: employee_id.value })
        }).then(res => res.text()).then(data => {
            alert(data);
            setTimeout(() => { window.location.reload(); }, 500);
        }).catch(err => console.log(err));
        handleDelete();
        employee_id.value = "";
    }
    return (
        <div className="staffpage">
            <div className="firstview">
                <img src={reportImage} alt="Employee" className="bgimage" />
                <h1>Employee Management</h1>
                <div>
                    <div className="headingspace">
                        <div className="home-header staff">
                            <div className="home-nav">
                                <div className="home-nav-item">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                    </svg>
                                    EMPLOYEE PAGE
                                </div>

                                <div className="home-user-menu">
                                    <div className="user-avatar-wrapper" onClick={() => toggleUserMenu()}>
                                        <div className="user-avatar">
                                            <div className="user-avatar">
                                                <img src={usericon}></img>
                                            </div>
                                        </div>
                                        <span className="admin-label">{userName}</span>
                                    </div>
                                    <div className={!menuOpen ? "home-user-info" : "home-user-info active"} id="userMenu">
                                        <div className="home-menu-item" onClick={() => logout()}>
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
                </div>
            </div>
            <div className="fix-table">
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
                            { Array.isArray(employees) &&  employees.filter(emp => emp.status === "Working").map((emp, i) => (
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
                    <div className="edit-employee-inputs">
                        <div className="edit-employee-id-input">
                            <p>Select Employee_ID: </p>
                            <input type="number" placeholder="Employee_ID"></input>
                            <button type="button" onClick={fetchEmployeeData} style={{margin: "10px 0", padding: "8px 15px", backgroundColor: "#2196F3", color: "white", border: "none", borderRadius: "5px", cursor: "pointer"}}>Fetch Employee</button>
                        </div>
                        <div className="edit-employee-data" style={{display: "none"}}>
                            <div className="edit-inputs-spacing">
                                <input type="text" placeholder="Name" disabled></input>
                                <input type="text" placeholder="Designation" disabled></input>
                                <input type="number" placeholder="Daily Wage" disabled></input>
                                <input type="password" placeholder="Password" disabled></input>
                                <input type="text" placeholder="Status" disabled></input>
                            </div>
                            <button onClick={EditEmployee}>Update Employee</button>
                        </div>
                    </div>
                </div>
                <div className="delete-employee-form hide">
                    <div className="delete-employee-inputs">
                        <p>Select Employee_ID: </p>
                        <input type="number" placeholder="Employee_ID"></input>
                    </div>
                    <button onClick={DeleteEmployee}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Staff