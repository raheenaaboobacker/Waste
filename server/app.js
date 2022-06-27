const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express();
app.use(cors());
app.use(express.json())
app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });
const userRouter=require("./src/routes/registerRouter")
const adminRouter=require("./src/routes/adminRouter");
const LoginRouter = require('./src/routes/loginRouter');
const wasteRouter=require("./src/routes/wasteRouter")
const volunteersRouter=require('./src/routes/volunteersRouter')
app.use('/',userRouter)
app.use('/admin',adminRouter)
app.use('/login',LoginRouter)
app.use('/waste',wasteRouter)
app.use('/volunteers',volunteersRouter)

app.listen(5000,function(){
    console.log("listening to: http://localhost:5000/")
});