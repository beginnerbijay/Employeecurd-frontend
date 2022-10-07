import React, { useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { UserContext } from '../Context';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Adduser = () => {
  const nav = useNavigate();
  const { show, setshow } = useContext(UserContext);
  const [state,setState] = useState({
    fname:"",
    lname:"",
    sex:"",
    age:"",
    salary:"",
    phone:"",
    email:"",
    job:"",
    add:"",
    image:""
  });
  const setpic =(e)=>{
    setState({...state,image:e.target.files[0]})
  }
  const setvalue =(e)=>{
    const {name,value} = e.target
    setState({...state,[name]:value})
  }
 const toasterror=()=>{
  toast.error('admin must login', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
 }
    

  const toastsuccess=()=>{
    toast.success('registration successful', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  const toastwarning=()=>{
    toast.warn('invalid entry! 3 letter must', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  

  const onsubmit=async(e)=>{
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('image',state.image);
    formdata.append('fname',state.fname);
    formdata.append('lname',state.lname);
    formdata.append('sex',state.sex);
    formdata.append('age',state.age);
    formdata.append('salary',state.salary);
    formdata.append('phone',state.phone);
    formdata.append('email',state.email);
    formdata.append('job',state.job);
    formdata.append('add',state.add);
    try{
      if(state.fname && state.lname &&  state.sex && state.age && state.salary && state.phone && state.email && state.job && state.add){
        const url= "http://localhost:8000/adduser/"
        const res = await axios.post(url,formdata);
        if(res.status == 422){
          alert('invalid')
        }else{
          console.log(res)
          toastsuccess()
          setTimeout(() => {
            nav("/")
          }, 2000);
         
        }
      }else{
        toastwarning()
      }
    }catch(e){
      console.log(e)
    }
  }
  
  
  return (
    <>
    {show?(<form method='POST' className='px-2'>
    <small className="form-text text-muted">We'll never share your data with anyone else.</small>
    <div className="form-group">
    <label >First Name</label>
    <input type="text" className="form-control"  placeholder="Enter First Name" onChange={setvalue} value={state.fname} name="fname"/>
  </div>
  <div className="form-group">
    <label >Last Name</label>
    <input type="text" className="form-control"  placeholder="Enter Last Name" onChange={setvalue} value={state.lname} name="lname"/>
  </div>
  <div className="form-group" style={{marginTop:5}}>
      <label>
       Gender
        <select value={state.sex} onChange={setvalue} name="sex" style={{marginLeft:10}}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
    </div>
    <div className="form-group">
    <label >Age</label>
    <input type="number" className="form-control"  placeholder="Enter Age" onChange={setvalue} value={state.age} name="age"/>
  </div>
    <div className="form-group">
    <label >Salary</label>
    <input type="number" className="form-control"  placeholder="Enter Salary" onChange={setvalue} value={state.salary} name="salary"/>
  </div>
  <div className="form-group">
    <label >Phone Number</label>
    <input type="number" className="form-control"  placeholder="Enter Phone Number" onChange={setvalue} value={state.phone} name="phone"/>
  </div>
  <div className="form-group">
    <label >Email address</label>
    <input type="email" className="form-control"  placeholder="Enter Email address" onChange={setvalue} value={state.email} name="email"/>
  </div>
  <div className="form-group">
    <label >Job Perofile</label>
    <input type="text" className="form-control" placeholder="Enter Job Perofile" onChange={setvalue} value={state.job} name="job"/>
  </div>
  <div className="form-group">
    <label >Address</label>
    <input type="text" className="form-control" placeholder="Enter Address" onChange={setvalue} value={state.add} name="add"/>
  </div>
  <div className="form-group">
    <label >Profile Pic</label>
    <input type="file" className="form-control" placeholder="upload pic" accect='.jpg .png .jpeg' name='image' onChange={setpic}/>
  </div>
  <button type="submit" style={{width:384,marginBottom:20}} className="btn btn-primary mt-2 submit" onClick={(e)=>onsubmit(e)}>Submit</button>
  <ToastContainer/>
</form>):(
  <div className='d-flex justify-content-center'>
  <button className="btn btn-danger mt-2" onClick={toasterror}>click here</button>
  <ToastContainer/>
  </div>
)}
</>
  )
}

export default Adduser