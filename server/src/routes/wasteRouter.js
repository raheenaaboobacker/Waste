const express=require('express')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const wastedata=require("../models/Wastedata")
const complaintdata=require("../models/complaintdata")
const paymentdata=require('../models/Payment')
const login=require('../models/logindata')
const userdata=require('../models/userdata')
const wasteRouter=express.Router()
const { response, json } = require("express");
const checkAuth = require("../middleware/check-auth")

wasteRouter.post('/add',checkAuth,(req, res)=>{
    var item = {
        login_id:req.userData.userId,
        type:req.body.type,
        quantity:req.body.quantity,
        date:req.body.date,
        status:'0',
        payment:"1"
        // recycle:"0"
    }
    console.log(item);
    
    var value = wastedata(item)
    value.save()
    .then((data)=>{
        var paymentData = {
            login_id:req.userData.userId,
            waste_id:data._id,
            amount:req.body.amount
        }
        console.log(paymentData);
        var paymentValue = paymentdata(paymentData)
        paymentValue.save()
        .then(()=>{
            res.status(200).json({
                success:true,
                error:false,
                message:'Waste added',
                payment:'success',
                user:req.userData.userId
            })
        })     
    })
    
    
})
wasteRouter.post('/addwaste',checkAuth,(req, res)=>{
    var item = {
        login_id:req.userData.userId,
        type:req.body.type,
        quantity:req.body.quantity,
        date:req.body.date,
        status:'0',
        payment:"0"
        // recycle:"0"
    }
    console.log(item);
    
    var value = wastedata(item)
    value.save()   
    .then(()=>{
        res.status(200).json({
            success:true,
            error:false,
            message:'Waste added',
            payment:'success',
            user:req.userData.userId
        })
    })   
})
wasteRouter.post('/addpayment',(req,res)=>{
    console.log(req.body);
        var paymentData = {
            login_id:req.body.login_id,
            waste_id:req.body.waste_id,
            amount:req.body.amount
        }
        console.log(paymentData);
        var paymentValue = paymentdata(paymentData)
        paymentValue.save()
        .then(()=>{
            wastedata.updateOne({_id:req.body.waste_id},{$set:{status:1,payment:1}})
            .then(()=>{
            res.status(200).json({
            success:true,
            error:false,
            message:'Waste Accepted',
        
        })
    })
        })     

})
wasteRouter.get('/single-user-request',checkAuth,(req,res)=>{
 
   console.log(req.userData);
   login.aggregate([
    {
        $lookup:
        {
            from:'waste_tbs',
            localField:'_id',
            foreignField:'login_id',
            as:'wasteData'
        }         
    },
   
    {
        $lookup:
        {
            from:'payment_tbs',
            localField:'_id',
            foreignField:'login_id',
            as:'paymentData'
        }  
    },
    
    {
        $match:
        {
            username:req.userData.username
        }
    }
])
.then(function(data){
         console.log("dataaaa",data);   
    res.status(200).json({
        success:true,
        error:false,
        Userdetails:data
    })
}) 
})
wasteRouter.get('/single-user-payment',checkAuth,(req,res)=>{
 
    console.log(req.userData);
    login.aggregate([
     {
         $lookup:
         {
             from:'waste_tbs',
             localField:'_id',
             foreignField:'login_id',
             as:'wasteData'
         }         
     },
     {
         $unwind:"$wasteData"
     },
     {
         $lookup:
         {
             from:'payment_tbs',
             localField:'_id',
             foreignField:'login_id',
             as:'paymentData'
         }  
     },
     {
         $unwind:"$wasteData"
     },
     {
         $match:
         {
             username:req.userData.username
         }
     }
 ])
 .then(function(data){
          console.log("dataaaa",data);   
     res.status(200).json({
         success:true,
         error:false,
         Userdetails:data
     })
 }) 
 })
wasteRouter.get('/user-payment',((req,res)=>{
   
    login.aggregate([
        {
            $lookup:
            {
                from:'waste_tbs',
                localField:'_id',
                foreignField:'login_id',
                as:'wasteData'
            },     
             
        },
        
        {
            $unwind:"$wasteData"
        },
        {
            $match:
            {
                role:2
            }
        }
    ])
    .then((data)=>{
        console.log("{data}",data);
        res.status(200).json({
            success:true,
            error:false,
            Userdetails:data
        })
    })
    // .then(function(data){
            
    //     res.status(200).json({
    //         success:true,
    //         error:false,
    //         Userdetails:data
    //     })
    // }) 
}))
wasteRouter.get('/paymentdetails',((req,res)=>{
   
    paymentdata.aggregate([{$lookup: {
        from: 'userdatas',
        localField: 'login_id',
        foreignField: 'login_id',
        as: 'wasteData'
      }}])
    .then((data)=>{
        console.log("{data}",data);
        res.status(200).json({
            success:true,
            error:false,
            Userdetails:data
        })
    })
    // .then(function(data){
            
    //     res.status(200).json({
    //         success:true,
    //         error:false,
    //         Userdetails:data
    //     })
    // }) 
}))
wasteRouter.post('/addcomplaints',((req,res)=>{
    var data={
        login_id:req.body.login_id,
        name:req.body.name,
        complaint:req.body.complaint
    }
    console.log(data);
    var complaintvalue=complaintdata(data)
    complaintvalue.save().then((result)=>{
        console.log(result);
        res.status(200).json({
            success:true,
            error:false,
            data:"sended...."
        })
    }
    )

}))
wasteRouter.get('/showcomplaints',((req,res)=>{
    complaintdata.aggregate([
        {
            $lookup:
            {
                from:'userdatas',
                localField:'login_id',
                foreignField:'login_id',
                as:'wasteData'
            }         
        },
    ]) .then((data)=>{
        console.log("{data}",data);
        res.status(200).json({
            success:true,
            error:false,
            data:data
        })
    })
    // complaintdata.find().then((result)=>{
    //     res.status(200).json({
    //         success:true,
    //         error:false,
    //         data:result
    //     })
    // })

}))
module.exports=wasteRouter