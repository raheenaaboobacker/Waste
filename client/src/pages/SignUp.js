import {React,useState} from 'react'
import {Form,Button,Container,Row,Col} from "react-bootstrap"
import { Alert } from 'react-bootstrap'
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {TextField} from '@mui/material'
import { useNavigate,Link, Navigate } from 'react-router-dom';
import "../pages/login/login.css"
function SignUp() {
  const navigate=useNavigate()
    const [contacts,setContacts]=useState({
      uname:"",
      name:"",
      email:'',
      phone:"",
      flatno:"",
      password:'',
     role:""
    });
    const [hide,setHide]=useState("")
    const [message,setMessage]=useState("")
  
    const handleInputChange=(e)=>{
        const {name,value}=e.target
        setContacts({
            ...contacts,
            [name]:value
        })
       console.log(JSON.stringify(contacts));
    
    }
    const addContacts=(e)=>{
        e.preventDefault()
        var phoneno = /^\(?([0-9]{10})$/;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(contacts.role===""){
          toast.warning("Please choose role!!",{autoClose:3000,theme:'light'})
        }else
        if(contacts.uname===''){
          toast.warning("Please enter user name!!",{autoClose:3000,theme:'light'})

        }else
        if(contacts.name===''){
          toast.warning("Please enter name!!",{autoClose:3000,theme:'light'})

        }else
        if(!mailformat.test(contacts.email)){
          toast.warning("Please enter user Email!!",{autoClose:3000,theme:'light'})

        }else
        if(contacts.role==="2"&&contacts.flatno===""){
          toast.warning("Please enter flatno!!",{autoClose:3000,theme:'light'})
        }
       else
          if(!phoneno.test(contacts.phone))
        {
            toast.warning("Please enter a valid  phone number!!",{autoClose:3000,theme:'light'})
        }else 
        if(contacts.password===''){
          toast.warning("Please enter password!!",{autoClose:3000,theme:'light'})

        }
       else{
        const header ={
          'Content-Type': 'application/json',
          
         }
 
        axios.post("http://localhost:5000/register",contacts,header) .then((response)=> {
          console.log("REGISTER RESULT======",response);
          if(response.data.success==true)
          {
            
            
              alert(response.data.message);
              navigate('/login')
             
 
          }
 
         else{
            alert(response.data.message)
         }
         
 
        })
        .catch((error) => {
          console.log(error);
         
            alert(error.response.data.message)
         
        });
      }
      }
  return (
    <div>
      <div className="container-fluid">
		<div className="row main-content bg-success text-center">
			
			<div className="col-md-12 col-xs-12 col-sm-12 login_form ">
				<div className="container-fluid">
					<div className="row">
						<h2>Sign up</h2>
					</div>
					<div className="row">
						<form onSubmit={addContacts} className="form-group">
							<div className="row">
              <select   className="form__input"
                    aria-label="Default select example"
                    name="role"
                    value={contacts.role} required
                    onChange={handleInputChange}>
                        <option selected>Choose Your Role</option>
                        <option value="2">User</option>
                        <option value="1">Volunteer</option>
                  </select>
              </div>
              <div className="row">
								<input type="text" id="username" className="form__input" placeholder="Username"
                 name='uname' onChange={handleInputChange} value={contacts.uname} />
							</div>
              <div className="row">
								<input type="text" id="name" className="form__input" placeholder="Name"
                 name='name' onChange={handleInputChange} value={contacts.name} />
							</div>
              <div className="row">
								<input type="email" id="email" className="form__input" placeholder="Email"
                 name='email' onChange={handleInputChange} value={contacts.email} />
							</div>
              { contacts.role==="2" ?
                   <><div className="row">
                   <input type="text" id="flatno" className="form__input" placeholder="Flat Number"
                    name='flatno' onChange={handleInputChange} value={contacts.flatno} />
                 </div></>:null}
              
              <div className="row">
								<input type="number" id="phone" className="form__input" placeholder="Phone Number"
                 name='phone' onChange={handleInputChange} value={contacts.phone} />
							</div>
							<div className="row">
              	<input type="password" id="password" className="form__input" placeholder="Password"
                name='password' onChange={handleInputChange} value={contacts.password}/>
							</div>
					
							<div className="row">
								<input type="submit"  className="btn" style={{width:"100%"}}/>
							</div>
						</form>
					</div>
					<div className="row">
						<p>Don't have an account? <a href="/login">login to your account</a></p>
					</div>
				</div>
			</div>
		</div>
	</div>  
    <ToastContainer/>
</div>
  )
}

export default SignUp