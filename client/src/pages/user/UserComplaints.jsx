import React, { useState,useEffect } from 'react'
import UserNav from '../../Components/UserNav'
import complaintimg from '../../upload/complaints.png'
import {Button} from "react-bootstrap"
import { toast,ToastContainer } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Footer from '../../Components/Footer'

function UserComplaints() {
    const navigate=useNavigate()
    
    const [complaint,setComplaint]=useState("")
    const [token,setToken]=useState(localStorage.getItem("token"))
  console.log(token);
  useEffect(()=>{
if(!token){
  navigate("/login")
}
  },[])
    const addcomplaint=(e)=>{
        console.log(e.target.value);
        setComplaint(e.target.value)
        
      }
      const buttonClicked=(e)=>{
        e.preventDefault();
if(complaint===''){
    toast.warning("enter complaintss!!",{autoClose:3000,theme:'dark'})
}
else{
 const name=localStorage.getItem("cname")
 const login_id=localStorage.getItem("login_id")
 const body={
    complaint,
    name,
    login_id

 }
 axios.post("http://localhost:5000/waste/addcomplaints",body).then((result)=>{
     alert(result.data.data)
navigate('/userdashboard')
 })
}

      }
  return (
    <div>
        <UserNav/>
        <div className="slider-area ">
           
           <div className="single-slider slider-height2 d-flex align-items-center" style={{ backgroundImage: "url(" + "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA1HRTPXtgqnTI6OKRA-KFIrhlC0IH3ZscVg&usqp=CAU" + ")",backgroundRepeat:"none",backgroundSize:"cover"}} >
               <div className="container">
                   <div className="row">
                       <div className="col-xl-12">
                           <div className="hero-cap text-center">
                               <h2 style={{color:'white'}}>Contact Us</h2>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
        <div class="wrapper row3">
  <main class="hoc container clear">
  <div class="content"> 
  <div id="comments">
  <form onSubmit={buttonClicked}>
          <div class="one_half first">
            <label for="name">Name <span>*</span></label>
            <input type="text" name="name" id="name"  size="22" required/>
          </div>
          <div class="one_half">
            <label for="email">Mail <span>*</span></label>
            <input type="email" name="email" id="email"  size="22" required/>
          </div>

          <div class="block clear">
            <label for="comment">Your Comment</label>
            <textarea   name="complaint" value={complaint} onChange={addcomplaint} id="comment" cols="25" rows="10"/>
          </div><br/>
          <div>
         
          <Button style={{marginTop:10}} variant="secondary" type="submit"  >
            ADD COMPLAINTS
            </Button>
          </div>
          </form>
        </div>
        </div>
  </main>
  </div>
    
<ToastContainer/>
<Footer/>
    </div>
  )
}

export default UserComplaints