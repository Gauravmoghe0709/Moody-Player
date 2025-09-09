const express = require ("express")
const songsroutes = require ("./routes/songs.routes")
const authroutes = require("./routes/auth.routes")
const cors = require ("cors")
const cookieparser = require("cookie-parser")


const app = express()
app.use(express.json())
app.use(cookieparser())
app.use(cors()) // cors is a middleware use for communicate and create a connection between frontend and backend
app.use("/",songsroutes)
app.use("/user",authroutes)



module.exports = app



