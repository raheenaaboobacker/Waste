const mongoose=require('mongoose');
mongoose.connect('mongodb://raheena:raheena%40123@cluster1-shard-00-00.zmtjd.mongodb.net:27017,cluster1-shard-00-01.zmtjd.mongodb.net:27017,cluster1-shard-00-02.zmtjd.mongodb.net:27017/wastemanagment?ssl=true&replicaSet=atlas-5vyr6c-shard-0&authSource=admin&retryWrites=true&w=majority') 
const Schema=mongoose.Schema;

const volunteerSchema= new Schema({
    login_id:{ type: Schema.Types.ObjectId, ref: "login_tb", required: true },
    name:{ type: String, required: true },
    email:{ type: String, required: true },
    phone:{ type: String, required: true },
    address:{type:String,required:true}
   
},{strict:false});
var volunteerdata=mongoose.model('volunteerdata',volunteerSchema);
module.exports=volunteerdata;