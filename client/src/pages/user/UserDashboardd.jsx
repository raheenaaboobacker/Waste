import React, { useEffect, useState } from 'react'
import { Row,Card } from 'react-bootstrap'
import Footer from '../../Components/Footer'
import UserNav from '../../Components/UserNav'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'


function UserDashboardd() { 
 const [arrOfData,setArrOfData]=useState([])
 const navigate=useNavigate()
 const [token,setToken]=useState(localStorage.getItem("token"))
 console.log(token);
 useEffect(()=>{
if(!token){
 navigate("/login")
}else{
  fetch('http://localhost:5000/waste/single-user-request', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token,
    },
}).then(res => res.json())
.then((data) => {console.log("RESULT========",data.Userdetails)
if(data?.Userdetails[0]?.status=="1")
{
  console.log(data?.Userdetails[0]?.wastedata);
  setArrOfData(data?.Userdetails[0]?.wasteData)


console.log(arrOfData);

}else{
  alert("request pending!!")
}

})
}
  }, [])
  const CheckStatus=(status)=>
{
  if(status==0)
  {
    alert("Request Send..")
  }
  else if(status==1)
  {
    alert("waste collected")
  }else if(status==2){
    alert("sent to recycle")
  }
 
} 
// const CheckRecycle=(recycle)=>
// {
//   if(recycle==0)
//   {
//     alert("could not send to recycle ")
//   }
//   else if(recycle==1)
//   {
//     alert("sent to Recycle")
//   }
 
// }  
  return (


    <div style={{height:500,}}>
      <UserNav/>
      <div className="slider-area ">
           
           <div className="single-slider slider-height2 d-flex align-items-center" style={{ backgroundImage: "url(" + "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA1HRTPXtgqnTI6OKRA-KFIrhlC0IH3ZscVg&usqp=CAU" + ")",backgroundRepeat:"none",backgroundSize:"cover"}} >
               <div className="container">
                   <div className="row">
                       <div className="col-xl-12">
                           <div className="hero-cap text-center">
                               <h2 style={{color:'white'}}>Requests</h2>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
       <main className="hoc container clear"> 
<Row>
      
    {
    arrOfData.length>0?(
      arrOfData.map((item,i)=> (
    <Card  style={{width:"300px",height:"190px",display: 'flex',marginLeft:"50px",marginTop:50,
      boxShadow:"2px 5px 5px 5px"}} >
      <Card.Body>
       <div class="card-body">
          <h4 class="card-title" key={i}>{item.type}</h4>
          <h5 class="card-title" key={i}>{item.quantity}</h5>
          <p class="card-text" key={i}>{item.waste_type}</p>
          <h6 class="card-title" >Requsted date :{moment(item?.date).format('YYYY-MM-DD')} </h6>
          <a onClick={()=>CheckStatus(item.status)} class="btn" style={{marginTop:5}}>
          Bin Status</a>
          {/* <a onClick={()=>CheckRecycle(item.recycle)} class="btn" style={{marginTop:5}}>
          Recycle Status</a> */}
      </div>
     </Card.Body>
   </Card> 
      
      ))): <div style={{width:"600px", margin:"auto"}}><div style={{textAlign:"center",fontSize:20}}  className="alert alert-warning" role="alert">
      No Request Found!
     </div></div>}
  </Row>
</main>
<Footer/>    
</div>

  )
}

export default UserDashboardd