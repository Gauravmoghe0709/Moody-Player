const express  = require ("express")
const multer = require ("multer")
const uploadfile = require("../service/Storage.service")
const songmodel = require("../model/song.model")



const router = express.Router()


const upload = multer({storage:multer.memoryStorage()}) 


router.post("/song",upload.single("audio"), async (req,res)=>{
    console.log(req.body)
    console.log(req.file) // get a file data in req.file 

    const filedata = await uploadfile(req.file)
    console.log(filedata)

    const song = await songmodel.create({
        songname:req.body.songname,
        Audio:filedata.url,
        mood:req.body.mood
    })

    res.status(201).json({
        message:"sucessfully...",
        song,
    })
})

router.get("/song",async(req,res)=>{
    const {mood} = req.query  // req.query is an object that contains all the query parameters sent by the client in the URL after the ?
    const songs = await songmodel.find({
        mood:mood
    })
    res.status(200).json({
        message:"sucessfully..",
        songs,
    })

})

module.exports = router