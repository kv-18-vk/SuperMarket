import { useEffect, useState } from "react";
import { useAuth } from "./auth";
import reportImage from "./assets/employee.jpg"; // Using report.png for employee page

function Staff() {
    const { userName, logout } = useAuth();
    const [employees, setData] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        fetch('https://supermarket-backend-f5yc.onrender.com/staff')
            .then(res => res.json())
            .then(data => {
                setData(data);
            })
            .catch(error => console.error('Error fetching employee data:', error));
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
                                            <svg viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="8" r="4" fill="#5E4030" />
                                                <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" fill="#5E4030" />
                                                <circle cx="12" cy="8" r="3.5" fill="#8B6F47" />
                                                <ellipse cx="10" cy="7.5" rx="0.8" ry="1" fill="#2D1810" />
                                                <ellipse cx="14" cy="7.5" rx="0.8" ry="1" fill="#2D1810" />
                                                <path d="M10.5 9c.5.3 1 .5 1.5.5s1-.2 1.5-.5" stroke="#8B6F47" strokeWidth="0.5" strokeLinecap="round" />
                                            </svg>
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
                            {employees.map((emp, i) => (
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
        </div>
    )
}

export default Staff