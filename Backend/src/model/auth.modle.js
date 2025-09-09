const mongoose = require("mongoose")



const authschema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    }
})

const authmodel = mongoose.model("users",authschema)

module.exports = authmodel