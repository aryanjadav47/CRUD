let express=require("express");
let app=express();
let PORT=process.env.PORT || 8700
let path=require("path");
let { connect } = require("./connection");
let userRouter=require('./router/url');



app.use(express.static('uploads'));

connect("mongodb://aryanjadav:NBSD6767@ac-v0o1mti-shard-00-00.30kdxyk.mongodb.net:27017,ac-v0o1mti-shard-00-01.30kdxyk.mongodb.net:27017,ac-v0o1mti-shard-00-02.30kdxyk.mongodb.net:27017/?ssl=true&replicaSet=atlas-8k5q6v-shard-0&authSource=admin&retryWrites=true&w=majority&appName=NodeApp").then(()=>console.log("mongo connected"));

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));

app.get("/",userRouter);
app.get("/add",userRouter);
app.get("/update/:id",userRouter);

app.use("/user",userRouter);
app.use("/update",userRouter);
app.get("/delete/:id",userRouter);

app.listen(PORT,()=>console.log("server started"));