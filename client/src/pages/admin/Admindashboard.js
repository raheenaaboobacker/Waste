import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminNav from '../../Components/AdminNav'
import Footer from '../../Components/Footer'
import HomeComp1 from '../../Components/HomeComp1'

function Admindashboard() {
  const navigate=useNavigate()
  const [token,setToken]=useState(localStorage.getItem("token"))
  console.log(token);
  useEffect(()=>{
if(!token){
  navigate("/login")
}
  },[])
  return (
    <div>
        <AdminNav/>
       <HomeComp1/>
       <Footer/>
    </div>
  )
}

export default Admindashboard