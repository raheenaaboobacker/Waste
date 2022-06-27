const express=require("express");
const Router=require("express")
const userRouter=express.Router();
const login = require('../models/logindata')
const user=require("../models/userdata")
const volunteer=require("../models/volunteerdata")
var jwt=require("jsonwebtoken");
const bcrypt=require('bcryptjs')
const { response, json } = require("express");
userRouter.post('/register',function(req,res){
    console.log(" data",req.body)

    bcrypt.hash(req.body.password,10, function(err, hashedPass){
        if(err){
           return res.status(400).json({
                success:false,
                error: true,
                message:'password hashing error'
            })
        }
        let logindata = {
            username:req.body.uname,
            password:hashedPass,
            role:req.body.role,
            status:0
        }
        login.findOne({username:req.body.uname})
        .then(uname=>{
            if(uname){
                console.log("username already exist!");
                return res.status(400).json({
                    success:false,
                    error: true,
                    message:'username already exist!'                    
                })
            }
            else{
                var item = login(logindata)
                item.save()
                .then((data)=>{
                    console.log("login data",data);
                    if(logindata.role==2){
                    login.findOne({username:logindata.username})
                    
                    .then(function(details){
                        var id = details._id
                        let items = {
                            login_id:id,
                            name:req.body.name,
                            email:req.body.email,
                            phone:req.body.phone,
                            flatno:req.body.flatno
                        }
                        var user_item = user(items)
                        user_item.save()
                        .then(()=>{
                            res.status(200).json({
                                success:true,
                                error: false,
                                message:'registration success'
                            })
                        })
                        
                    })
                }
                else  if(logindata.role==1){
                    login.findOne({username:logindata.username})
                    
                    .then(function(details){
                        var id = details._id
                        let item = {
                            login_id:id,
                            name:req.body.name,
                            email:req.body.email,
                            phone:req.body.phone
                          
                        }
                        var volunteer_item = volunteer(item)
                        volunteer_item.save()
                        .then(()=>{
                            res.status(200).json({
                                success:true,
                                error: false,
                                message:'registration success'
                            })
                        })
                        
                    })
                }
                })

            }
        })
    })
    
})

module.exports=userRouter;