import { useState, useEffect } from 'react'
export default function Table({ employeesList, setEmployessList, editingEmp, setEditingEmp }) {

    function handleDelete(id){
        try {
            const arrayAfterDeletingAnEmployee = employeesList.filter((emp)=>emp.id !== id)
            setEmployessList(arrayAfterDeletingAnEmployee)
        } catch (error) {
            console.log(error);
        }
    }

    function handleEdit(id){
        try {
            let empToEdit = employeesList.find((emp)=>emp.id === id)
            setEditingEmp(empToEdit)
        } catch (error) {
           console.log(error.message) 
        }
    }

    return (

        <div className="mb-5">
            <table className="table table-striped table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">Tags</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {employeesList.map((emp, index) => {
                    return (
                        <tr key={emp.id}>
                            <th scope="row">{index+1}</th>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.password}</td>
                            <td>
                                <ul>
                                    {
                                        emp.tags ? emp.tags.map((t, ind)=>{
                                            return(
                                                <li key={ind}><span className="badge bg-info text-dark me-1" key={ind}>{t}</span></li>
                                            )
                                        }) : null
                                    }
                                </ul>
                                
                            </td>
                            <td className="d-flex gap-2">
                                <button className="btn btn-warning" onClick={()=>handleEdit(emp.id)}>Edit</button>
                                <button className="btn btn-danger" onClick={()=>handleDelete(emp.id)}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>
        
    );
}
