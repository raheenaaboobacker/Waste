const express=require('express')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const login=require('../models/logindata')
const user=require('../models/userdata')
const volunteer=require('../models/volunteerdata')

const LoginRouter=express.Router()
const { response, json } = require("express");

LoginRouter.post('/logindata',(req, res)=>{
    console.log("logindata====",req.body)
    let fetchedUser
    login.findOne({username: req.body.username})
    .then((user)=>{
       
        if(!user){
            return res.status(401).json({
                success:false,
                error:true,
                message:"User Not Found!"
            })
        }
            fetchedUser = user
            return bcrypt.compare(req.body.password, user.password)      
    })
    .then(result=>{
        if(!result){
            return res.status(401).json({
                success:false,
                error:true,
                message:"Please Check Password!"
            })
        }
        id = fetchedUser._id
        console.log(fetchedUser);
        if(fetchedUser.role=="0"){
            volunteer.findOne({login_id:id})
                .then((registerData)=>{
                    const token = jwt.sign(
                        {username:fetchedUser.username, name: registerData.name, 
                            userId:fetchedUser._id},
                        "secret_this_should_be_longer",
                        { expiresIn: "1h" }
                    )
                    res.status(200).json({
                        success:true,
                        error:false,
                        token: token,
                        expiresIn: 3600,
                         role:fetchedUser.role,
                        loginId: fetchedUser._id,
                        name: registerData.name
                    })
                })
    }
        if(fetchedUser.role=="2"){
              if(fetchedUser.status=="1"){
            console.log("approved");
            user.findOne({login_id:id})
            .then((registerData)=>{
                const token = jwt.sign(
                    {username:fetchedUser.username, name: registerData.name, 
                        userId:fetchedUser._id},
                    "secret_this_should_be_longer",
                    { expiresIn: "1h" }
                )
                res.status(200).json({
                    success:true,
                    error:false,
                    token: token,
                    expiresIn: 3600,
                    name: registerData.name,
                    role:fetchedUser.role,
                    loginId: fetchedUser._id,
                    name: registerData.name
                })
            })
     
        } 
        else{
            res.status(200).json({
                success:false,
                error:true,
              message:"request pending!!!!!!!!!!"
            })
        }
        }
        else if(fetchedUser.role=="1"){
            if(fetchedUser.status=="1"){
                console.log("approved");
                volunteer.findOne({login_id:id})
                .then((registerData)=>{
                    const token = jwt.sign(
                        {username:fetchedUser.username, name: registerData.name, 
                            userId:fetchedUser._id},
                        "secret_this_should_be_longer",
                        { expiresIn: "1h" }
                    )
                    res.status(200).json({
                        success:true,
                        error:false,
                        token: token,
                        expiresIn: 3600,
                         role:fetchedUser.role,
                        loginId: fetchedUser._id,
                        name: registerData.name
                    })
                })
         
            }
            else{
                res.status(200).json({
                    success:false,
                    error:true,
                  message:"request pending!!!!!!!!!!"
                })
            }
        }
      
       
       
       
    })
    .catch(err=>{
        return res.status(401).json({
            message: "Auth failed"
        })
    })
})




module.exports=LoginRouter