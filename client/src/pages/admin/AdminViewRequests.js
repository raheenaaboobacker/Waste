import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AdminNav from '../../Components/AdminNav'
import {Card,Row} from 'react-bootstrap'
import Footer from '../../Components/Footer'
import { useNavigate } from 'react-router-dom'

function AdminViewRequests() {
    const [arrOfData,setArrOfData]=useState([])
    const [message,setMessage]=useState([])
    const navigate=useNavigate()
    const [token,setToken]=useState(localStorage.getItem("token"))
    console.log(token);
    useEffect(()=>{
  if(!token){
    navigate("/login")
  }else{
    axios.get('http://localhost:5000/waste/user-payment')
    .then((response)=> {
      console.log("USERS PAYMENTS======",response);
     if(response.data.success==true)
           {
             setArrOfData(response.data.Userdetails)
             console.log(arrOfData);
              //console.log("PAYMENT======",this.state.arrOfData)
           }
   })
    .catch((error) => {
      console.log(error);
     
    });
  }
    },[message])
  return (
    <div>
        <AdminNav/>
        <div className="container">
                   <div className="row">
                       <div className="col-xl-12">
                           <div className="hero-cap text-center">
                               <h2 style={{color:'black'}}>Requests</h2>
                           </div>
                       </div>
                   </div>
               </div>
    <main className="hoc container clear" style={{marginTop:-150}}> 
<Row>
      
    {arrOfData?.sort((a,b)=>
      a?.wasteData?.status > b?.wasteData?.status ? 1 : -1
    ).map(item=>   
                    <Card  style={{width:"300px",height:"170px",display: 'flex',marginLeft:"50px",marginTop:50,
                    boxShadow:"2px 5px 5px 5px"}} >
                   <Card.Body>
                   {/* minWidth: '18rem', flexGrow: 1, margin:'1rem', minHeight:'32rem' */}
                   <h4 class="card-title">Name:{item?.username}</h4>
                   
                   <h6 >Waste type :{item?.wasteData?.type} </h6>
                    <h6 class="card-title" >Quantity :{item?.wasteData?.quantity} </h6> 

                    {item?.wasteData?.status==0?
                      <h6 style={{marginTop:20, color:"#008080"}}>Request Not Accept</h6>:
                        (item?.wasteData?.recycle==0?<h6 style={{marginTop:20, color:"#008080"}}>Request Accepted</h6>:
                       <h6 style={{marginTop:20, color:"#008080"}}> Sent To Recycle</h6>)
                       }
                       
              </Card.Body>
            </Card>
  
  
 
               )}   
            </Row>
            </main>
        <Footer/>
    </div>
  )
}

export default AdminViewRequests