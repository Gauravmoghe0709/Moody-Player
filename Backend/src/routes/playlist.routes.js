const playlistmodel = require("../model/userplaylist.model")
const express = require("express")
const multer = require("multer")
const uploadfile = require("../service/Storage.service")



const router = express.Router()

const upload = multer({ storage: multer.memoryStorage() })

// create a new playlist 
router.post("/:userid", async (req, res) => {
    const { userid } = req.params
    const { playlistname } = req.body


    const newplaylist = await playlistmodel.create({
        userid,
        playlistname,
        songs: []
    })

    res.status(201).json({
        message: "playlist created...",
        newplaylist,
    })

})

// add a songs to playlist
router.post("/:userid/uploadsong/:playlistid", upload.single("usersong"), async (req, res) => {
    const filedata = await uploadfile(req.file)
    console.log(filedata)
    const { userid, playlistid } = req.params
    const { title, artist } = req.body

    const newplaylist = await playlistmodel.findOne({
        _id: playlistid,
        userid,
    })

    if (!newplaylist) {
        return res.status(404).json({
            message: "playlist not found..."
        })
    }

    const songurl = filedata.url // song url 

    newplaylist.songs.push({ title, artist, url: songurl })
    await newplaylist.save() // "Ab isko database me save kar do!" then we use .save()method  

    res.status(201).json({
        message: "New song added...",
        newplaylist
    })

})
// get a all song playlist (when we open a songs page then see all songs )
router.get("/:playlistid/songs", async (req, res) => {
    const { playlistid } = req.params

    const playlist = await playlistmodel.findOne({
        _id: playlistid
    })

    if (!playlist) {
        return res.status(404).json({
            message: "playlist not found"
        })
    }

    res.status(200).json({
        message: "song fetched sucessfully...",
        song: playlist.songs

    })



})


// GET songs by search (artist or title)
router.get("/songs/search", async (req, res) => {
  try {
    const { query } = req.query; // ?query=something

    const song = await playlistmodel.find({
      $or: [
        { "songs.artist": { $regex: query, $options: "i" } },
        { "songs.title": { $regex: query, $options: "i" } }
      ]
    });

    if (song.length === 0) {
      return res.status(404).json({ message: "No songs found" });
    }

    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: "Error searching songs", error });
  }
});

module.exports = router

/*
   Explanation

  $regex → MongoDB operator jo partial matching allow karta hai.

"arijit" search karne pe "Arijit Singh" bhi match karega.

$options: "i" → case insensitive search (Arijit == arijit == ARIJIT).

$or → ek saath multiple fields me search karne ke liye.

Example: title OR artist match ho to result aayega.

*/










