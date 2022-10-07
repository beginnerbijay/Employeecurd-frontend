import React,{useContext} from 'react'
import {NavLink} from 'react-router-dom'
import { UserContext } from '../Context';
const Navbar = () => {
  const { show, setshow } = useContext(UserContext);
  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand ms-5" to="/"><i className="bi bi-person-badge"></i>Employee Dashboard</NavLink>
    <div id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-lg-0">
        <li className="nav-item">
      {show?<button className='btn btn-outline-light btn-primary logout' onClick={()=>setshow(null)}>Log Out</button>:""}
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar