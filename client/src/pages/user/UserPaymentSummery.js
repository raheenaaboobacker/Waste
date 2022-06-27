import { useEffect,useState } from "react"
import React from 'react'
import UserNav from "../../Components/UserNav"
import { Card, Row } from "react-bootstrap"
import Footer from "../../Components/Footer"
import { useNavigate } from 'react-router-dom'

function UserPaymentSummery() {
  const navigate=useNavigate()
  const [arrOfData,setArrOfData]=useState([])
  const [token,setToken]=useState(localStorage.getItem("token"))
  console.log(token);
  useEffect(()=>{
if(!token){
  navigate("/login")
}else{
  fetch('http://localhost:5000/waste/single-user-payment', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token,
    },
})
.then(res => res.json())
.then((data) => {console.log("RESULT========",data)
   
        if(data.success==true)
       {
           console.log(data.Userdetails);
        setArrOfData(data.Userdetails)
console.log(arrOfData);
       }



});
}
}, [])

  return (
    <div>
<UserNav/>
<div className="slider-area ">
           
           <div className="single-slider slider-height2 d-flex align-items-center" style={{ backgroundImage: "url(" + "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA1HRTPXtgqnTI6OKRA-KFIrhlC0IH3ZscVg&usqp=CAU" + ")",backgroundRepeat:"none",backgroundSize:"cover"}} >
               <div className="container">
                   <div className="row">
                       <div className="col-xl-12">
                           <div className="hero-cap text-center">
                               <h2 style={{color:'white'}}>Payment Summery</h2>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
       <main className="hoc container clear">
<Row>
{arrOfData.map((item,i)=>(
  <Card style={{width:"300px",height:"100px",display: 'flex',marginLeft:"50px",marginTop:50,
  boxShadow:"2px 5px 5px 5px"}} >
    <Card.Body>
    <p class="card-text" key={i}>{item?.wasteData?.type}</p>
    <p class="card-text" key={i}>{item?.wasteData?.quantity}</p>
    <p class="card-text" key={i}>{item?.paymentData[i]?.amount}</p>

{/* <a onClick={()=>CheckStatus(item.status)} class="btn" style={{backgroundColor:'#129b05',color:'white'}}>
Bin Status</a> */}

 
    </Card.Body>
  </Card>




 ))}
 </Row>
 </main>
 <Footer/>
    </div>
  )
}

export default UserPaymentSummery