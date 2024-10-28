import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [seremp, setSerEmp] = useState([]);
    const [filteredemp, setFilteredEmpm] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState({ id: null, name: '', address: '', position: '', salary: '', experience: '', phone: '', email: '', empid: '' });

    useEffect(() => {
        axios.get('https://alan2325.pythonanywhere.com/employe/employees/') 
            .then(response => {
                setEmployees(response.data)
                setFilteredEmpm(response.data)
            })
            .catch(error => console.log(error));
    }, []);

    const deleteEmployee = (id) => {
        axios.delete(`https://alan2325.pythonanywhere.com/employe/employees/${id}/`) 
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
        axios.put(`https://alan2325.pythonanywhere.com/employe/employees/${id}/`, updatedEmployee) 
            .then(response => {
                setEmployees(employees.map(employee => (employee.id === id ? response.data : employee)));
            })
            .catch(error => console.log(error));
    }
    useEffect(() => {
        const result = employees.filter(employee => {
            const searchTerm = seremp.toString(); 
            return (
                employee.name.includes(searchTerm) || 
                employee.position.includes(searchTerm) || 
                employee.phone.toString().includes(searchTerm) 
            );
        });
        setFilteredEmpm(result);
    }, [seremp, employees]);
    

    return (
        <div className="container mt-3">
            <h2>Employee List</h2>
            <input type="text" placeholder= "search" value={seremp} onChange={(e)=>setSerEmp(e.target.value)} />
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Position</th>
                        <th>Salary</th>
                        <th>Experiance</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Emp ID</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredemp.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.address}</td>
                            <td>{employee.position}</td>
                            <td>{employee.salary}</td>
                            <td>{employee.experiance}</td>
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
                    name="experiance"
                    value={employee.experiance}
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

