let mongooose=require("mongoose");

async function connect(url){
    return mongooose.connect(url);
}

module.exports={
    connect,
}