import { useEffect, useState } from "react"
import React from 'react'
import axios from "axios"
import { Card, Row } from 'react-bootstrap'
import AdminNav from "../../Components/AdminNav"
import { useNavigate } from 'react-router-dom'
import Footer from "../../Components/Footer"

function AdminviewComplaints() {
    const [complaint,setComplaint]=useState([])
    const [clamped, setClamped] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const handleClick = () => setClamped(!clamped);
    const navigate=useNavigate()
    const [token,setToken]=useState(localStorage.getItem("token"))
    console.log(token);
    useEffect(()=>{
  if(!token){
    navigate("/login")
  }else{
         axios.get("http://localhost:5000/waste/showcomplaints").then((res)=>{
         console.log(res.data.data);
setComplaint(res.data.data)
console.log(complaint);
     })
    }
    }, [])
    const mapdata=complaint?.map(((item,i)=>{
      return( <tr>
        <td data-label="Name">{item.name}</td>
        <td data-label="Contact No">{item.wasteData[0].phone}</td>
        <td data-label="Flat no">{item.wasteData[0].flatno}</td>
        <td data-label="Flat no"key={i} >{item.complaint.length<10?<>{item.complaint}</>:<><div key={i} className={("long-text", clamped && "clamp")}> {item.complaint }
       {showButton && (
        <button className="button" key={i}  onClick={handleClick}>Read {clamped ? "more" : "less"}</button>
      )}
       </div></>}</td>
        
      </tr>
    //   <li className="table-row" style={{fontSize:15}}>
      
    //   <div className="col col-1" data-label="Name">{item.name}</div>
    //   <div className="col col-2" data-label="Contact No">{item.wasteData[0].phone}</div>
    //   <div className="col col-2" data-label="Flat no">{item.wasteData[0].flatno}</div>
    //   <div className="col col-4" data-label="Complaints">
    //    </div>
    //    {item.complaint.length<10?<> {item.complaint }</>:<><div key={i} className={("long-text", clamped && "clamp")}> {item.complaint }
    //    {showButton && (
    //     <button className="btn"  onClick={handleClick}>Read {clamped ? "more" : "less"}</button>
    //   )}
    //    </div></>}
      
     
    // </li>
    )}))
  return (
    <div>
        <AdminNav/>
        
        <main classNameName="hoc container clear">
   
        <div className="div2">
        <h2>Complaints</h2>
        <table>
        
  
  <thead >
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Contact No</th>
      <th scope="col">Flat No</th>
      <th scope="col">Compalints</th>
    </tr>
  </thead>
  <tbody>
   {mapdata}
  </tbody>
    </table>
      
        </div>
     
</main><br/><br/>
<Footer/>
    </div>
  )
}

export default AdminviewComplaints