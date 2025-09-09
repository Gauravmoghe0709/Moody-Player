const mongoose = require("mongoose")



const authschema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    }
})

const authmodel = mongoose.model("users", authschema)

module.exports = authmodel