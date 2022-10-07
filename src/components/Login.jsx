import React,{useState} from 'react'
import { useNavigate } from 'react-router'
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({setshow}) {
    const [state, setstate] = useState({
        username:'',
        password:''
    })
    const nav = useNavigate()
    const toasterror=()=>{
      toast.error('login invalid', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
     } 
    const handle=(e)=>{
        const {name,value} = e.target
        setstate({...state,[name]:value})
    }
    console.log(state)
    const login=(e)=>{
        e.preventDefault();
        if(state.username == 'admin' && state.password == 'password'){
            setshow(true)
            nav('/')
        }else{
            setshow(false)
           toasterror()
        }
    }
  return (
        <div className="mt-5 form">
  <form className="px-4 py-3">
    <div className="mb-3">
      <label htmlFor="exampleDropdownFormEmail1" className="form-label">username</label>
      <input type="text" className="form-control" id="exampleDropdownFormEmail1" placeholder="username" onChange={handle} name='username'/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleDropdownFormPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password" onChange={handle} name='password'/>
    </div>
   <button type="submit" className="btn btn-primary login" onClick={(e)=>login(e)}>Log In</button>
   <ToastContainer/>
  </form>
</div>
  )
}

export default Login