import React,{ useState} from "react";
import {Form,Button,Container,Row,Col} from "react-bootstrap"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import {TextField} from '@mui/material'
import "./login.css"
function Login() {
 
  const navigate=useNavigate();

    const [contacts,setContacts]=useState({
      username:'',
        password:''

    });
    
    const handleInputChange=(e)=>{
        const {name,value}=e.target
        setContacts({
            ...contacts,
            [name]:value
        })
       
    }
    const validation=(e)=>{
        e.preventDefault();
        console.log("login data"+JSON.stringify(contacts)) ;
       
        axios.post("http://localhost:5000/login/logindata",contacts)
        .then((response)=> {
          console.log("LOGIN RESULT======",response.data);
          if(response.data.success==true)
          {
            if(response.data.role===0){
              localStorage.setItem("token",response.data.token)
              window.sessionStorage.setItem("isLoggedIn",true)
              navigate('/admindashboard')
              }
              else  if(response.data.role===1){
                localStorage.setItem("token",response.data.token)
                window.sessionStorage.setItem("isLoggedIn",true)
                navigate('/volunteerdashboard')
                }
            // console.log(response.data);
            
            
       else if(response.data.role===2){
        localStorage.setItem("login_id",response.data.loginId)
        localStorage.setItem("token",response.data.token)
      
        localStorage.setItem("cname",response.data.name)
        window.sessionStorage.setItem("isLoggedIn",true)
            navigate('/userdashboard')
            }
            
          } else if(response.data.success==false){
            alert(response.data.message)
          }
                })
                .catch((error) => {
                  console.log(error);
                  alert(error.response.data.message);
                });
    


    }
  return (
    <div className="App" >
      	<div className="container-fluid" style={{paddingTop:100}}>
		<div className="row main-content bg-success text-center">
			
			<div className="col-md-12 col-xs-12 col-sm-12 login_form ">
				<div className="container-fluid">
					<div className="row">
						<h2>Log In</h2>
					</div>
					<div className="row">
						<form onSubmit={validation} className="form-group">
							<div className="row">
								<input type="text" id="username" className="form__input" placeholder="Username"
                 name='username' onChange={handleInputChange} value={contacts.username} required/>
							</div>
							<div className="row">
						
								<input type="password" id="password" className="form__input" placeholder="Password"
                name='password' onChange={handleInputChange} value={contacts.password} required/>
							</div>
					
							<div className="row">
								<input type="submit"  className="btn" style={{width:"100%"}}/>
							</div>
						</form>
					</div>
					<div className="row">
						<p>Don't have an account? <a href="/signup">Register Here</a></p>
				<br/><br/>
        	</div>
				</div>
			</div>
		</div>
	</div>
 
  </div>
  )
}

export default Login