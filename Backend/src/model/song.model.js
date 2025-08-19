const mongoose = require("mongoose")



const songsschema = new mongoose.Schema({
    songname:String,
    Audio:String,
    mood:String


})

const songs = mongoose.model("song",songsschema)

module.exports = songs