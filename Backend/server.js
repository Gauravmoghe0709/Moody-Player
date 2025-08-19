require("dotenv").config()
const app = require("./src/app")
const connectwithdatabase = require("./src/db/db")




connectwithdatabase()


app.listen(3000,()=>{
    console.log("server running on port 3000")
})