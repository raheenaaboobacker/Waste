import React from 'react'
import {Navbar,Container,Nav} from "react-bootstrap"
import {useNavigate} from 'react-router-dom'
function UserNav() {
  const navigate=useNavigate()
   const logout=()=>
  {
    localStorage.clear();
    window.sessionStorage.clear();
   navigate('/')
  }
  return (
   
    <div>
       <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{padding:20}}>
    <div className="container-fluid">
        <a href="" className="navbar-brand"style={{fontSize:25,fontWeight:"bold"}}>GOGREEN</a>
        <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto" style={{fontSize:15,fontWeight:"bolder"}}> 
               <a href="user_add_request" className="nav-item nav-link ">Add Request</a>
                <a href="user_payment_summary"className="nav-item nav-link">Payment Summary</a>
                <a href="usercomplaints" className="nav-item nav-link">Contact</a>
                <a onClick={logout} href="/" className="nav-item nav-link">Log Out</a>
              
            </div>
        </div>
    </div>
</nav>
</div>
  )
}

export default UserNav