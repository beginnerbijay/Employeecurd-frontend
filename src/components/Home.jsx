import React, { useEffect, useState,useContext } from 'react'
import {NavLink} from 'react-router-dom'
import Login from './Login';
import { UserContext } from '../Context';

const Home = () => {
  const [user,setUser] = useState([]);
  const { show, setshow } = useContext(UserContext);
  const getdata =async()=>{
    try{
      const res = await fetch("http://localhost:8000/",{
            method:"GET",
            headers:{
              'Content-Type':'application/json'
            }
          });
          const responce = await res.json();
          if(res.status === 422){
             console.log("invalid")
          }else{
             console.log("rendering successful");
            setUser(responce)
          }
        }catch(e){
           console.log('error')
        }
  }

  const deleteuser = async(id)=>{
    try{
      const res = await fetch(`http://localhost:8000/delete/${id}`,{
            method:"DELETE",
            headers:{
              'Content-Type':'application/json'
            }
          });
          const responce = await res.json();
          if(res.status === 422){
             console.log("invalid")
          }else{
             console.log("deleted");
             getdata();
          }
        }catch(e){
           console.log('error')
        }
  }
  useEffect(()=>{
    getdata();
  },[]);
  return (
    <>
    {show ?
      (<div className='container px-2'>
      <NavLink className="" to="/adduser"><button className='btn btn-outline-light btn-primary addemp'>Add Employee</button></NavLink>
      <table className="table">
    <thead className="table-dark">
      <tr>
        <th scope="col">id</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">phone</th>
        <th scope="col" style={{width:240}}>email</th>
        <th scope="col">job profile</th>
        <th scope="col">address</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      {user.map((ele,index)=>{
        return(
      <tr key={index}>
        <th scope="row">{index+1}</th>
        <td>{ele.fname}</td>
        <td>{ele.lname}</td>
        <td>{ele.phone}</td>
        <td>{ele.email}</td>
        <td>{ele.job}</td>
        <td>{ele.add}</td>
        <td className='style' style={{width:200}}>
        <NavLink to={`user/${ele._id}`}><button style={{paddingBlock:2}} className='btn btn-success'><i className="bi bi-eye-fill"></i></button></NavLink>
        <NavLink to={`edit/${ele._id}`}><button style={{paddingBlock:2,marginLeft:8}} className='btn btn-primary'><i className="bi bi-pencil-square"></i></button></NavLink>
        <button style={{paddingBlock:2,marginLeft:8}} className='btn btn-danger' onClick={()=>deleteuser(ele._id)}><i className="bi bi-trash3-fill"></i></button>
        </td>
      </tr>
        )
      })}
    </tbody>
  </table>
  </div>) : <Login setshow={setshow}/>
    }
    </>
  )
}

export default Home