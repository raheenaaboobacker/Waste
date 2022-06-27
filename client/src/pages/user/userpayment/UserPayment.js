import React, { useState,useEffect } from 'react'
import "./userpayment.css"
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams,useNavigate } from 'react-router-dom'



function UserPayment() {
    const [selectedDate,setSelectedDate]=useState(null)
    const [token,setToken]=useState(localStorage.getItem("token"))
    const [payment,setPayment]=useState(localStorage.getItem("payment"))
    const navigate=useNavigate()
    const { waste, quantity } = useParams();
    const [tprice,setTprice]=useState("")
    const [userDataReg,setUserDataReg]=useState({
        card_number:"",
        expiry_date:"",
        cvv:"",
        customer_name:""
      
    })
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = year + "-0" + month + "-" + day;
    console.log(newdate);
    const today = new Date().toDateString();
  
    useEffect(()=>{
        if(!payment){ 
            navigate("/userdashboard")
        }else{
     console.log(waste);
     console.log(quantity);
     if(quantity==="low")
     {
        console.log("price===","30")
        setTprice("30")
        console.log(tprice);
     }
     else if(quantity==="medium")
     {
         console.log("price===","60")
         setTprice("60")
         console.log(tprice);
     }

     else if(quantity==="high")
     {
         console.log("price===","90")
         setTprice("90")
         console.log(tprice);
     }
    }
    }, [])
    
    const handleInputChange=(e)=>{
        const {name,value}=e.target
        console.log(e.target.value);
        setUserDataReg({
            ...userDataReg,
            [name]:value
        })
       console.log(JSON.stringify(userDataReg));
    
    }
    const handleButtonClicked=()=>{
        if(userDataReg.card_number===""){
            console.log("jhgfd");
            toast.warning("Enter card number!!",{autoClose:3000,theme:'light'})

        }else if(userDataReg.expiry_date===""){
            toast.warning("Enter card expiry date!!",{autoClose:3000,theme:'light'})

        }
        else if(userDataReg.cvv===""){
            toast.warning("Enter card cvv!!",{autoClose:3000,theme:'light'})

        }
        else if(userDataReg.customer_name===""){
            toast.warning("Enter card custemer name!!",{autoClose:3000,theme:'light'})

        }
        else{
           
            console.log(token);
            const params = {
                type:waste,
                quantity:quantity,
                amount:tprice
               
              }
       
              console.log("params",params)
             
              fetch('http://localhost:5000/waste/add', {
               method: 'POST',
               body: JSON.stringify(params),
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization':'Bearer '+token
               },
           })
           .then(res => res.json())
           .then((data) => {
               console.log("Result========",data)
               if(data.success==true)
               {
                 
           
                   alert(data.message)
                   localStorage.removeItem("payment")
                   navigate('/userdashboard')
               }
               else{
                   alert("Failed!")
               }
        })
        }
       
     
    }
  return (
    <div class="paymentdiv">
     <div class="container p-5">
        <div class="card px-4">
            <p class="h8 py-3">Payment Details</p>
            <div class="row gx-3">
                <div class="col-12">
                    <div class="d-flex flex-column">
                        <p class="text mb-1">Holder Name</p>
                        <input class="form-control mb-3" type="text" placeholder="Name" 
                         name="customer_name"
                         value={userDataReg.customer_name}
                         onChange={handleInputChange}
                         required 
                        />
                    </div>
                </div>
                <div class="col-12">
                    <div class="d-flex flex-column">
                        <p class="text mb-1">Card Number</p>
                        <input class="form-control mb-3" type="number" placeholder="1234 5678 4356"
                        name="card_number"
                        value={userDataReg.card_number}
                        onChange={handleInputChange}required/>
                    </div>
                </div>
                <div class="col-6">
                    <div class="d-flex flex-column">
                        <p class="text mb-1">Expiry</p>
                        <input class="form-control mb-3" type="date" placeholder="MM/YYYY"
                         name="expiry_date" min={newdate}
                         value={userDataReg.expiry_date}
                         onChange={handleInputChange} required
                        />
                    </div>
                </div>
                <div class="col-6">
                    <div class="d-flex flex-column">
                        <p class="text mb-1">CVV/CVC</p>
                        <input class="form-control mb-3 pt-2 " type="password" placeholder="***"
                         name="cvv" 
                         value={userDataReg.cvv}
                         onChange={handleInputChange} required
                        />
                    </div>
                </div>
                <div class="col-12">
                     <button type="submit" className="btn btn-primary mb-3 text-center" 
                        onClick={handleButtonClicked}
                        >Pay ₹{tprice}</button>
                    
                </div>
            </div>
        </div>
    </div>

<ToastContainer/>
</div>
  )
}

export default UserPayment