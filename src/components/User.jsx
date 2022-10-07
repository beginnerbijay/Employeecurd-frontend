import axios from 'axios';
import React, { useEffect, useState,useContext } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import logo from './blank-profile-picture-gb76a0291b_640.png'
import { UserContext } from '../Context';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = () => {
  const {id} = useParams();
  const [user,setuser] = useState([]);
  const { show, setshow } = useContext(UserContext);
  const [imagepath,setimagepath] = useState('')
  const [imageshow,setimageshow] = useState(false)

  const toasterror=()=>{
    toast.error('admin must login', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
   }
  const getdata =async()=>{
    try{
      const res = await axios.get(`http://localhost:8000/user/${id}`);
      const responce = res.data;
      if(res.status === 422){
         console.log("invalid")
      }else{
        console.log("rendering successful");
        setimagepath(`http://localhost:8000/images/${responce.image}`)
        if(responce.image){
          setimageshow(true)
        }else{
          setimageshow(false)
        }
        setuser(responce)
      }
    }catch(e){
       console.log('error')
    }
  }  
  useEffect(()=>{
    getdata()
  },[])
  return (
    <>
    {show?(<div className='container  d-flex justify-content-evenly break'>
    <div className='my-auto mx'>
      <img src={imageshow?imagepath:logo} style={{height:250,marginTop:100}}></img>
    </div>
    <div className="card" style={{width: 550,marginTop:100}}>
  <div className="card-body">
    <h2 className="card-title"><span>Name : </span>{user.fname} {user.lname}</h2>
    <h4 className="card-title mb-2"><span>Job Profile : </span>{user.job}</h4>
    <h5 className="card-title mb-2"><span>Gender : </span>{user.sex}</h5>
    <h5 className="card-title mb-2"><span>Age : </span>{user.age}</h5>
    <h5 className="card-title mb-2"><span>Salary : </span>{user.salary}</h5>
    <h5 className="card-title mb-2"><span><i className="bi bi-telephone"></i> Contact No : </span>{user.phone}</h5>
    <h5 className="card-title mb-2"><span><i className="bi bi-envelope"></i> Email Id : </span>{user.email}</h5>
    <h5 className="card-text"><span><i className="bi bi-house-door"></i> Address : </span>{user.add}</h5>
    <NavLink to={"/"} state={{ data: {title: " How to pass state in react-router-dom"}}}><button className='btn btn-primary mt-2 px-5 py-1'>Back</button></NavLink>
    <NavLink to={`../edit/${user._id}`}><button className='btn btn-primary mt-2 px-3 py-1 ms-2'><i className="bi bi-pencil-square"></i></button></NavLink>
  </div>
</div>
</div>):(
  <div className='d-flex justify-content-center'>
   <button className="btn btn-danger mt-2" onClick={toasterror}>click here</button>
   <ToastContainer/>
   </div>
)
}
</>
  )
}

export default User