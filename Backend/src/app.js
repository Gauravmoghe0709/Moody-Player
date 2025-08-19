const express = require ("express")
const songsroutes = require ("./routes/songs.routes")
const cors = require ("cors")



const app = express()
app.use(express.json())
app.use(cors()) // cors is a middleware use for communicate and create a connection between frontend and backend
app.use("/",songsroutes)



module.exports = app



