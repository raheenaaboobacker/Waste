const mongoose = require('mongoose')
mongoose.connect('mongodb://raheena:raheena%40123@cluster1-shard-00-00.zmtjd.mongodb.net:27017,cluster1-shard-00-01.zmtjd.mongodb.net:27017,cluster1-shard-00-02.zmtjd.mongodb.net:27017/wastemanagment?ssl=true&replicaSet=atlas-5vyr6c-shard-0&authSource=admin&retryWrites=true&w=majority') 
const Schema = mongoose.Schema    //schema definition

const WasteSchema = new Schema({
     login_id:{ type: Schema.Types.ObjectId, ref: "login_tb", required: true },
     type:{ type: String, required: true },
     quantity:{ type: String, required: true },
     status:{ type: Number, required: true }, 
     recycle:{type: Number, required: true }
})

var Wastedata = mongoose.model('waste_tb',WasteSchema) //model creation
module.exports=Wastedata;