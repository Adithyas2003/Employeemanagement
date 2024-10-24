import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState({ id: null, name: '', address: '', position: '', salary: '', experience: '', phone: '', email: '', empid: '' });

    useEffect(() => {
        axios.get('https://aiswarya2325.pythonanywhere.com/employemanagement/employees/') 
            .then(response => setEmployees(response.data))
            .catch(error => console.log(error));
    }, []);

    const deleteEmployee = (id) => {
        axios.delete(`https://aiswarya2325.pythonanywhere.com/employemanagement/employees/${id}/`) 
            .then(() => {
                setEmployees(employees.filter(employee => employee.id !== id));
            })
            .catch(error => console.log(error));
    }

    const editEmployee = (employee) => {
        setEditing(true);
        setCurrentEmployee(employee);
    }

    const updateEmployee = (id, updatedEmployee) => {
        setEditing(false);
        axios.put(`https://aiswarya2325.pythonanywhere.com/employemanagement/employees/${id}/`, updatedEmployee) 
            .then(response => {
                setEmployees(employees.map(employee => (employee.id === id ? response.data : employee)));
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="container mt-3">
            <h2>Employee List</h2>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Position</th>
                        <th>Salary</th>
                        <th>Experience</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Emp ID</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.address}</td>
                            <td>{employee.position}</td>
                            <td>{employee.salary}</td>
                            <td>{employee.experience}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.email}</td>
                            <td>{employee.empid}</td>
                            <td>
                                <button className="btn btn-warning px-3" onClick={() => editEmployee(employee)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => deleteEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editing ? (
                <EditEmployeeForm
                    currentEmployee={currentEmployee}
                    updateEmployee={updateEmployee}
                    setEditing={setEditing}
                />
            ) : null}
        </div>
    );
}

const EditEmployeeForm = ({ currentEmployee, updateEmployee, setEditing }) => {
    const [employee, setEmployee] = useState(currentEmployee);

    useEffect(() => {
        setEmployee(currentEmployee);
    }, [currentEmployee]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateEmployee(employee.id, employee);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Employee</h2>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={employee.name}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Address</label>
                <input
                    type="text"
                    name="address"
                    value={employee.address}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Position</label>
                <input
                    type="text"
                    name="position"
                    value={employee.position}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Salary</label>
                <input
                    type="number"
                    name="salary"
                    value={employee.salary}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Experience</label>
                <input
                    type="text"
                    name="experience"
                    value={employee.experience}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Phone</label>
                <input
                    type="text"
                    name="phone"
                    value={employee.phone}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={employee.email}
                    onChange={handleInputChange}
                />
            </div>

            <button type="submit">Update Employee</button>
            
        </form>
    );
};

export default EmployeeList;

