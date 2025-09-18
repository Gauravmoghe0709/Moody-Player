const mongoose = require("mongoose")



const userplaylistschema = new mongoose.Schema({

    userid :{ 
             type:mongoose.Schema.Types.ObjectId,
             ref:"user",
             required:true
    },
     playlistname:{type:String,require:true},
     songs:[
      {
         url:String,
         artist:String,
         title:String,
      },
     ]   
})

const playlistmodel = mongoose.model("user playlist",userplaylistschema)

module.exports = playlistmodel