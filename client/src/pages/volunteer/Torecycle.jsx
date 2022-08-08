import axios from 'axios'
import React, { useEffect, useState } from 'react'
import VolNav from '../../Components/VolNav'
import HomeComp1 from '../../Components/HomeComp1'
import {Card,Row} from 'react-bootstrap'
import Footer from '../../Components/Footer'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'


function Torecycle() {
    const [arrOfData,setArrOfData]=useState([])
    const [message,setMessage]=useState([])
    const [data,setData]=useState([])
    const [requests,setRequests]=useState("")
    let count=0;
    const navigate=useNavigate()
    const [token,setToken]=useState(localStorage.getItem("token"))
    console.log(token);
    useEffect(()=>{
  if(!token){
    navigate("/login")
  }else{
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
                 const numAscending = [...arrOfData].sort((a, b) => b._id - a._id);
                 console.log(numAscending);
                
                 const sorted = [...arrOfData].sort((a, b) => b[arrOfData.sortProperty] - a[arrOfData.sortProperty]);
                 setData(sorted)
                 console.log(data);
                 }
       })
        .catch((error) => {
          console.log(error);
         
        });
      
        },[])
  return (
    <div>
         <VolNav data={requests}/>
         <div className="container">
                   <div className="row">
                       <div className="col-xl-12">
                           <div className="hero-cap text-center">
                               <h2 style={{color:'black'}}>Recycle </h2>
                           </div>
                       </div>
                   </div>
               </div>
    <main className="hoc container clear" id='volrequest' style={{marginTop:-150}}> 
<Row>
      
    {arrOfData?.map(item=>   <>{item?.wasteData?.status==2?<Card  style={{width:"300px",height:"160px",display: 'flex',marginLeft:"40px",marginTop:50,
    boxShadow:"2px 5px 5px 5px"}} >
   <Card.Body>
   {/* minWidth: '18rem', flexGrow: 1, margin:'1rem', minHeight:'32rem' */}
   <h4 class="card-title">Name:{item?.username}</h4>
   
   <h6 >Waste type :{item?.wasteData?.type} </h6>
    <h6 class="card-title" >Quantity :{item?.wasteData?.quantity} </h6> 
    <h6 class="card-title" >Requsted date :{moment(item?.wasteData?.date).format('YYYY-MM-DD')} </h6>

   
       
</Card.Body>
</Card>:null}
</>
                    
  
  
 
               )}   
            </Row>
            </main>
            <Footer/>
    </div>
  )
}

export default Torecycle