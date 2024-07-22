let mongoose=require("mongoose");
const path = require("path");
const { deflate } = require("zlib");

let userSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
    },
    number:{
        type:Number,
        required: true,
    },
    image:{
        type:String,
        required : true,
    },
}, {timestamps : true});

let user=mongoose.model("crud",userSchema);

module.exports=user;