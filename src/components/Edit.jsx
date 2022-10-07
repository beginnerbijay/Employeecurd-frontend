import axios from 'axios';
import React, { useEffect,useState,useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../Context';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit = () => {
  const {id} = useParams();
  const nav = useNavigate();
  const {show, setshow} = useContext(UserContext);
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
    image:''
  });

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
   const toastsuccess=()=>{
    toast.success('edit successful', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  const setvalue =(e)=>{
    const {name,value} = e.target
    setState({...state,[name]:value})
  }
  const setpic =(e)=>{
    setState({...state,image:e.target.files[0]})
  }

  const getdata =async()=>{
    try{
      const res = await fetch(`http://localhost:8000/user/${id}`,{
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
            setState(responce)
          }
        }catch(e){
           console.log('error')
        }
  }
  useEffect(()=>{
    getdata();
  },[]);
  
const onchange = async(e) =>{
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
  const res = await axios.patch(`http://localhost:8000/edit/${id}`,formdata);
  const responce =  res.data;
  if(res.status === 422){
     console.log("invalid")
  }else{
     toastsuccess()
    setState(responce);
    setTimeout(() => {
      nav('/')
    }, 2000);
  }
}catch(e){
   console.log('error')
}
}

  return (
    <>
    {show ?(<form method='POST' className='px-2'>
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
  <button type="submit" className="btn btn-primary mt-2 mb-3 px-5 py-1" onClick={onchange}>Edit</button>
  <ToastContainer/>
</form>):(
   <div className='d-flex justify-content-center'>
   <button className="btn btn-danger mt-2" onClick={toasterror}>click here</button>
   <ToastContainer/>
   </div>
)
}
</>
  )
}

export default Edit