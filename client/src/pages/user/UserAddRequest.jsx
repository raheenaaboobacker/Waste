import React, { useState,useEffect } from 'react'
import UserNav from '../../Components/UserNav'
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Navigate,useNavigate,Link } from 'react-router-dom';
import Footer from '../../Components/Footer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function UserAddRequest() {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const navigate=useNavigate()
    const [tprice,setTprice]=useState("")
    const today = new Date().toDateString();
    const [userDataReg,setUserDataReg]=useState({ 
        waste:"",
        quantity:""})
        const [token,setToken]=useState(localStorage.getItem("token"))
        
        useEffect(()=>{
            if(!token){
              navigate("/login")
            }
              },[])
        const handleInputChange=(e)=>{
            const {name,value}=e.target
            console.log(e.target.value);
            setUserDataReg({
                ...userDataReg,
                [name]:value
            })
           console.log(JSON.stringify(userDataReg));
        
        }
        const buttonClick=()=>{
            
            if(userDataReg.waste===''){
                // console.log("not enterd");
                toast.warning("Choose Waste!!",{autoClose:3000,theme:'light'})
            }else if(userDataReg.quantity===''){
                toast.warning("Choose Quantity!!",{autoClose:3000,theme:'light'})

            }
            else{
                localStorage.setItem("payment",true)
                navigate(`/user_payment/${userDataReg.waste}/${userDataReg.quantity}`)
            }
        }
        const cashOndDelivery=()=>{
            
            if(userDataReg.waste===''){
                // console.log("not enterd");
                toast.warning("Choose Waste!!",{autoClose:3000,theme:'light'})
            }else if(userDataReg.quantity===''){
                toast.warning("Choose Quantity!!",{autoClose:3000,theme:'light'})

            }
            else{
                if(userDataReg.waste==="bio-waste"||userDataReg.waste==="plastic"){
                    if(userDataReg.quantity==="low")
                    {
                        console.log("price===","30")
                        setTprice("30")
                        console.log(tprice);
                    }
                    else if(userDataReg.quantity==="medium")
                    {
                        console.log("price===","60")
                        setTprice("60")
                        console.log(tprice);
                    }
        
                    else if(userDataReg.quantity==="high")
                    {
                        console.log("price===","90")
                        setTprice("90")
                        console.log(tprice);
                    }
            }else {
                if(userDataReg.quantity==="low")
                {
                    console.log("price===","60")
                    setTprice("60")
                    console.log(tprice);
                }
                else if(userDataReg.quantity==="medium")
                {
                    console.log("price===","90")
                    setTprice("90")
                    console.log(tprice);
                }
        
                else if(userDataReg.quantity==="high")
                {
                    console.log("price===","120")
                    setTprice("120")
                } 
                
            }
            handleShow()
                // localStorage.setItem("payment",true)
                // navigate(`/user_payment/${userDataReg.waste}/${userDataReg.quantity}`)
            }
        }
        const addReqest=((e)=>{
            e.preventDefault();
            const params = {
                type:userDataReg.waste,
                quantity:userDataReg.quantity,
                amount:tprice,
               date:today
              }
              console.log(params);
              handleClose()
            fetch('http://localhost:5000/waste/addwaste', {
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
                   
                    navigate('/userdashboard')
                }
                else{
                    alert("Failed!")
                }
         })
        
        })
  return (
    <div>
    <UserNav/>
    <div className="slider-area ">
           
           <div className="single-slider slider-height2 d-flex align-items-center" style={{ backgroundImage: "url(" + "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA1HRTPXtgqnTI6OKRA-KFIrhlC0IH3ZscVg&usqp=CAU" + ")",backgroundRepeat:"none",backgroundSize:"cover"}} >
               <div className="container">
                   <div className="row">
                       <div className="col-xl-12">
                           <div className="hero-cap text-center">
                               <h2 style={{color:'white'}}>Request</h2>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
      <main className="hoc container clear"> 
<div className="row d-flex">
<div className="col-lg-6" style={{ marginTop:"-50px"}}>
   <div className="card1 pb-5">
     
       <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkxA6h_pV-w8yHoW7srbjEG-NdDRqo-3VlbA&usqp=CAU" className="image"/> 
            </div>
   </div>
</div>
<div className="col-lg-6">
   <div className="card2 card border-0 px-4 py-5">
    <div className="row px-3 mb-4">


       <div className=" row px-3 mb-4" style={{marginRight:80, marginTop:"-50px"}}>
           
       <select 
       style={{borderRadius:10}}
       className="form-select" 
       aria-label="Default select example"
       name='waste'
       onChange={handleInputChange} value={userDataReg.waste} required
       >
            <option selected>Choose Waste Type</option>
           <option value="bio-waste">Bio Waste</option>
           <option value="e-waste">E Waste</option>
           <option value="plastics">Plastics</option>
           <option value="furniture">Furniture</option>
       </select>
       </div>

       <div className=" row px-3 mb-4" style={{marginTop:10,}}>
       <select 
       style={{borderRadius:10}}
       className="form-select" 
       aria-label="Default select example"
       name='quantity'
      onChange={handleInputChange} value={userDataReg.quantity} required
       >
            <option selected>Choose Quantity Type</option>
           <option value="low">Low</option>
           <option value="medium">Medium</option>
           <option value="high">High</option>
       </select>
       </div>
       <div className="row px-3 mb-4"> 
        <button type="submit" className="btn btn-blue w-100 text-center" onClick={buttonClick}>Payment</button>
        <button type='submit' className="btn btn-blue w-100 text-center" onClick={cashOndDelivery} >Cash on delivery</button>
    
     </div>
     </div>
     
       
   </div>
</div>
</div>
</main>
<ToastContainer/>
<Footer/>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>GOGREEN</Modal.Title>
        </Modal.Header>
        <Modal.Body><h4>{userDataReg.waste}</h4>
        <h5>{userDataReg.quantity}</h5>
        <h4>₹{tprice}</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary w-100" onClick={addReqest}>
           Add Request
          </Button>
     
        </Modal.Footer>
      </Modal>

</div>
  )
}

export default UserAddRequest