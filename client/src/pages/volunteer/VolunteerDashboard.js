import axios from 'axios'
import React, { useEffect, useState } from 'react'
import VolNav from '../../Components/VolNav'
import HomeComp1 from '../../Components/HomeComp1'
import {Card,Row} from 'react-bootstrap'
import Footer from '../../Components/Footer'
import { useNavigate } from 'react-router-dom'

function VolunteerDashboard() {
  const [arrOfData,setArrOfData]=useState([])
  const [message,setMessage]=useState([])
  const [data,setData]=useState([])
  const [requests,setRequests]=useState("")
  const navigate=useNavigate()
  const [token,setToken]=useState(localStorage.getItem("token"))
  console.log(token);
  let count=0;
  useEffect(()=>{
    if(!token){
      navigate("/login")
    }{
    axios.get("http://localhost:5000/volunteers/getRequestcount")
    .then((response)=>{
      console.log("waste PAYMENTS======",response.data.data);
    count=response.data.data.length;
        console.log(count);
      setRequests(count)
    
    })
  } 
  }, [])
  
  useEffect(()=>{ 
  axios.get('http://localhost:5000/waste/user-payment')
  .then((response)=> {
    console.log("USERS PAYMENTS======",response);
   if(response.data.success==true)
         {
           setArrOfData(response.data.Userdetails)
           console.log(arrOfData);
           
           }
 })
  .catch((error) => {
    console.log(error);
   
  });

  },[message])
  
  const AcceptRequest=(id)=>{
console.log(id);
const url="http://localhost:5000/volunteers/accept-request/"+id

console.log("url",url)

axios.get(url)
.then((response)=> {
console.log("REQUEST======",response);


if(response.data.success==true)
{
  setMessage(response.data.message)

  alert("accepted")

  
}
  })
}
const SendRecycle=(id)=>{
  console.log(id);
  const url="http://localhost:5000/volunteers/sent-recycle/"+id
  
  console.log("url",url)
  
  axios.get(url)
  .then((response)=> {
  console.log("REQUEST======",response);
  
  
  if(response.data.success==true)
  {
    setMessage(response.data.message)
  
    alert("send to recycle")

    
  }
    })
  }
  return (
    <div>           
    <VolNav data={requests}/>
    <HomeComp1/>
    <div className="container">
                   <div className="row">
                       <div className="col-xl-12">
                           <div className="hero-cap text-center">
                               <h2 style={{color:'black'}}>Requests</h2>
                           </div>
                       </div>
                   </div>
               </div>
    <main className="hoc container clear" id='volrequest' style={{marginTop:-150}}> 
<Row>
      
    {arrOfData?.sort((a,b)=>
      a?.wasteData?.status > b?.wasteData?.status ? 1 : -1
    ).map(item=>   <>{item?.wasteData?.recycle==1?null:<Card  style={{width:"300px",height:"200px",display: 'flex',marginLeft:"40px",marginTop:50,
    boxShadow:"2px 5px 5px 5px"}} >
   <Card.Body>
   {/* minWidth: '18rem', flexGrow: 1, margin:'1rem', minHeight:'32rem' */}
   <h4 class="card-title">Name:{item?.username}</h4>
   
   <h6 >Waste type :{item?.wasteData?.type} </h6>
    <h6 class="card-title" >Quantity :{item?.wasteData?.quantity} </h6> 

    {item?.wasteData?.status==0?
      <a onClick={()=>AcceptRequest(item?.wasteData?._id)} class="btn" style={{}}>Accept Request</a>:
        (item?.wasteData?.recycle==0?<a onClick={()=>SendRecycle(item?.wasteData?._id)} class="btn" style={{}}>Sent To Recycle</a>:
     null)
       }
       
</Card.Body>
</Card>}
</>
                    
  
  
 
               )}   
            </Row>
            </main>
            <Footer/>
</div>
  )
}

export default VolunteerDashboard