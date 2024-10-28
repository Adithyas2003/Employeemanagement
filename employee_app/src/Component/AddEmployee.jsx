import React,{useState} from "react";
import axios from "axios";

 const AddDetails=()=>{
    const[name,addName]=useState('');
    const [address,addAddress]=useState('');
    const [position,addPos]=useState('');
    const [salary,addSalry]=useState('');
    const [experiance,addExpr]=useState('');
    const [phone,addPhone]=useState('');
    const [email,addEmail]=useState('');
    const [empid,addEmpid]=useState('');


    const handelSubmit =(e)=>{
        console.log('add form');
        
        e.preventDefault();
        axios.post('https://alan2325.pythonanywhere.com/employe/employees/',{name,address,position,salary,experiance,phone,email,empid})
        .then (response=>{
            console.log(response.data);
            addName('');
            addAddress('');
            addPos('');
            addSalry('');
            addExpr('')
            addPhone('')
            addEmail('');
            addEmpid('')
        })
        .catch(error=> console.log(error));
    }
     return(
        <div className="container">
            <form onSubmit={handelSubmit}>
                <h2 className='text-info'><u>Add Details</u></h2>
                <div>
                    <label className="text-dark">Name</label>
                    <input 
                        className="form-control"
                        type="text"
                        value={name}
                        onChange={(e)=> addName(e.target.value)}
                    />
                </div>
                <div className="mt-2">
                    <label>Address</label>
                    <textarea
                        className="form-control"
                        value={address}
                        onChange={(e)=> addAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-dark">Position</label>
                    <input 
                        className="form-control"
                        type="text"
                        value={position}
                        onChange={(e)=> addPos(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-dark">Salary</label>
                    <input 
                        className="form-control"
                        type="number"
                        value={salary}
                        onChange={(e)=> addSalry(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-dark">Experience</label>
                    <input 
                        className="form-control"
                        type="text"
                        value={experiance}
                        onChange={(e)=> addExpr(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-dark">Phone No.</label>
                    <input 
                        className="form-control"
                        type="number"
                        value={phone}
                        onChange={(e)=> addPhone(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-dark">Email</label>
                    <input 
                        className="form-control"
                        type="email"
                        value={email}
                        onChange={(e)=> addEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-dark">EmpId</label>
                    <input 
                        className="form-control"
                        type="number"
                        value={empid}
                        onChange={(e)=> addEmpid(e.target.value)}
                    />
                </div>

                    <button type="submit" className="btn btn-success mt-3">Add</button>
            </form>
        </div>
     )
 }
 export default AddDetails


