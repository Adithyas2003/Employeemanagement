import React, { useState } from "react";
import axios from 'axios';

const AddEmployee = () => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://dummyjson.com/api/users/', { name, position, department }) 
            .then(response => {
                console.log(response.data);
                setName('');
                setPosition('');
                setDepartment('');
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2 className='text-info'><u>Add Employee</u></h2>
                <div>
                    <label className='text-dark'>Name</label>
                    <input
                        className='form-control'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mt-2">
                    <label>Position</label>
                    <input
                        className='form-control'
                        type="text"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                    />
                </div>
                <div className="mt-2">
                    <label>Department</label>
                    <input
                        className='form-control'
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    />
                </div>
                <button type="submit" className='btn btn-success mt-3'>Add Employee</button>
            </form>
        </div>
    )
}

export default AddEmployee;
