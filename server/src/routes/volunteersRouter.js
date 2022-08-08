const express = require('express')
var mongoose = require('mongoose');
const volunteersRouter = express.Router()
const login = require('../models/logindata')
const volunteer=require("../models/volunteerdata")
const wastedata=require("../models/Wastedata")
volunteersRouter.get('/getRequestcount',(req,res)=>{
    wastedata.find({status:0}).
    then((data)=>{
        res.status(200).json({
            success:true,
            error:false,
            data:data,
        })
    })
})
volunteersRouter.get('/accept-request/:id',(req,res)=>{
    const id = req.params.id
    console.log(id)
    wastedata.updateOne({_id:id},{$set:{status:1}})
    .then(()=>{
            res.status(200).json({
            success:true,
            error:false,
            message:'Waste Accepted',
        
        })
    })
    
})

volunteersRouter.get('/sent-recycle/:id',(req,res)=>{
    const id = req.params.id
    console.log(id)
    wastedata.updateOne({_id:id},{$set:{status:2}})
    .then(()=>{
            res.status(200).json({
            success:true,
            error:false,
            message:'sent to recycle',
        
        })
    })
    
})

module.exports=volunteersRouter;