const mongoose = require("mongoose")


function connectwithdatabase(){
    mongoose.connect(process.env.MONGOODB_URL)
    .then(()=>{
        console.log("connect with moody player..")
    })    
}

module.exports = connectwithdatabase

