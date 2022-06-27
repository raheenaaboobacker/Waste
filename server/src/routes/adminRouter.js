const express=require("express");
const Router=require("express");
const user = require("../models/userdata");
const login=require("../models/logindata")
const volunteer=require("../models/volunteerdata")
const adminRouter=express.Router();
adminRouter.get('/getuserdata',(req,res)=>{
    user.aggregate([
        {  $lookup:
            {
               from:'login_tbs',
               localField:'login_id',
               foreignField:'_id',
                        
               as:"registerdetails"
           }                        
        },
       
    ]).then(function(data){
            console.log(data);
        res.status(200).json({
            success:true,
            error:false,
            details:data
        })
    }) 
})
adminRouter.delete('/delete/:id',((req,res)=>{
    const id=req.params.id
    console.log(id);
    user.deleteOne({login_id:id}) .then(function () {
        login.deleteOne({ _id: id })
            .then(() => {
                res.status(200).json({
                    success: true,
                    error: false,
                    message: 'User deleted!'
                })
            })

    })

   
    .catch(err => {
        return res.status(401).json({
            message: "Something went Wrong!"
        })
    })
}))
adminRouter.get('/getvolunteerdata',(req,res)=>{
    login.aggregate([
        {  $lookup:
            {
               from:'volunteerdatas',
               localField:'_id',
               foreignField:'login_id',
                        
               as:"registerdetails"
           }                        
        },
        {

    $match:
    {
        role:1
    }

        },
       
    ]).then(function(data){
            console.log(data);
        res.status(200).json({
            success:true,
            error:false,
            details:data
        })
    }) 
})

adminRouter.post('/approveusers/:id',(req,res)=>{
    const id=req.params.id
    console.log(id);
    login.updateOne(  { _id:id} , { $set: { status : 1  } } ).then((user)=>{
        console.log(user);
        res.status(200).json({
            success:true,
            error:false,
            message:"approved"
        })
        
    }).catch(err => {
        return res.status(401).json({
            message: "Something went Wrong!"
        })
    })
})


adminRouter.delete('/deleteVolunteer/:id',((req,res)=>{
    const id=req.params.id
    console.log(id);
    volunteer.deleteOne({login_id:id}) .then(function () {
        login.deleteOne({ _id: id })
            .then(() => {
                res.status(200).json({
                    success: true,
                    error: false,
                    message: 'User deleted!'
                })
            })

    })

   
    .catch(err => {
        return res.status(401).json({
            message: "Something went Wrong!"
        })
    })
}))



module.exports=adminRouter