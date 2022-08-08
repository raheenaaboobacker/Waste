import React, { useState,useEffect } from 'react'
import "./userpayment.css"
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams,useNavigate } from 'react-router-dom'



function UserPayment() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = year + "-0" + month + "-" + day;
    console.log(newdate);
    const [selectedDate,setSelectedDate]=useState(null)
    const [token,setToken]=useState(localStorage.getItem("token"))
    const [payment,setPayment]=useState(localStorage.getItem("payment"))
    const navigate=useNavigate()
    const { waste, quantity } = useParams();
    const [tprice,setTprice]=useState("")
    const [userDataReg,setUserDataReg]=useState({
        upi:"",
        card_number:"",
        expiry_date:"",
        cvv:"",
        customer_name:"",
        method:""
      
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
     if(waste==="bio-waste"||waste==="plastic"){
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
}else {
    if(quantity==="low")
    {
        console.log("price===","60")
        setTprice("60")
        console.log(tprice);
    }
    else if(quantity==="medium")
    {
        console.log("price===","90")
        setTprice("90")
        console.log(tprice);
    }

    else if(quantity==="high")
    {
        console.log("price===","120")
        setTprice("120")
        console.log(tprice);
    } 
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
       console.log(userDataReg);
    
    }
    
    const handleButtonClicked=(e)=>{
        e.preventDefault();
        const upiId= /^\(?([a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64})$/;
        var cnumber = /^\(?([0-9]{12})$/;
        var CVV = /^\(?([0-9]{3})$/;
        if(userDataReg.method===""){
            toast.warning("Please Choose Payment Method !!",{autoClose:3000,theme:'light'})

        }else
        if(userDataReg.method==="upi"){
            if(!upiId.test(userDataReg.upi)){
                toast.warning("Please enter valid Upi Id!!",{autoClose:3000,theme:'light'})
                }else{
                    console.log(token);
                    const params = {
                        type:waste,
                        quantity:quantity,
                        amount:tprice,
                       date:today
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
        else if(userDataReg.method==="debit"||"credit"){
         if(!cnumber.test(userDataReg.card_number)){
            toast.warning("Enter valid card number !!",{autoClose:3000,theme:'light'})

        }
        else if(userDataReg.customer_name===""){
            console.log("jhgfd");
            toast.warning("Enter card custemer name!!",{autoClose:3000,theme:'light'})

        }else if(userDataReg.expiry_date===""){
            toast.warning("Enter card expiry date!!",{autoClose:3000,theme:'light'})

        }
        else if(!CVV.test(userDataReg.cvv)){
            toast.warning("Enter card cvv!!",{autoClose:3000,theme:'light'})

        }
        else{
           
            console.log(token);
            const params = {
                type:waste,
                quantity:quantity,
                amount:tprice,
               date:today
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
     
    }
  return (
    <div class="paymentdiv">
     <div class="pcontainer p-4">
        <div class="card px-4">
            <p class="h8 py-3">Payment Details</p>
            <div class="row gx-3">
                <div class="col-6">
                    <div class="d-flex flex-column">
                        <p class="text mb-1">Payment Method</p>
                        <select class="form-control mb-3" 
                        name="method"
                        value={userDataReg.method}
                        onChange={handleInputChange}required>
                            <option selected>Choose Payment Method</option>
                            <option value="debit">Debit</option>
                            <option value="credit">Credit</option>
                            <option value="upi">UPI</option>
                        </select>
                    </div>
                </div>
                {userDataReg.method==="upi"? 
                <div class="col-6">
                    <div class="d-flex flex-column">
                        <p class="text mb-1">UPI ID</p>
                        <input class="form-control mb-3" type="text" placeholder="upi id"
                        name="upi"
                        value={userDataReg.upi}
                        onChange={handleInputChange}required/>
                    </div>
                </div>:<>
                <div class="col-6">
                    <div class="d-flex flex-column">
                        <p class="text mb-1">Card Number</p>
                        <input class="form-control mb-3" type="number" placeholder="1234 5678 4356"
                        name="card_number"
                        value={userDataReg.card_number}
                        onChange={handleInputChange}required/>
                    </div>
                </div>
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
                </div></>}
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