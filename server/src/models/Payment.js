const mongoose = require('mongoose')
mongoose.connect('mongodb://raheena:raheena%40123@cluster1-shard-00-00.zmtjd.mongodb.net:27017,cluster1-shard-00-01.zmtjd.mongodb.net:27017,cluster1-shard-00-02.zmtjd.mongodb.net:27017/wastemanagment?ssl=true&replicaSet=atlas-5vyr6c-shard-0&authSource=admin&retryWrites=true&w=majority') 
const Schema = mongoose.Schema    //schema definition

const PaymentSchema = new Schema({
     login_id:{ type: Schema.Types.ObjectId, ref: "login_tb", required: true },
     waste_id:{ type: Schema.Types.ObjectId, ref: "waste_tb", required: true },
     amount:{ type: String, required: true },
})

var Paymentdata = mongoose.model('payment_tb',PaymentSchema) //model creation
module.exports=Paymentdata;