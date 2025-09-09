const express = require("express")
const authmodel = require("../model/auth.modle")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


const router = express.Router()




router.post("/register",async(req,res)=>{

    const {name,username,password} = req.body

    const userexist = await authmodel.findOne({username })
    if(userexist){
        return res.status(400).json({
            message:"user already exist"
        })
    }

    const user = await authmodel.create({
        name,
        username,
        password:await bcrypt.hash(password, 10)
    })

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
    res.cookie("token", token)

    res.status(201).json({
        message:"New user create sucessfully..."
    })
})

router.post("/login",async(req,res)=>{
    const {username,password} = req.body

    const userexist = await authmodel.findOne({
        username
    })
    if(!userexist){
        return res.status(401).json({
            message:"invalid username"
        })
    }

    const userpassword = await bcrypt.compare(password, userexist.password) 

    if(!userpassword){
        return res.status(401).json({
            message:"password does not match..."
        })
    }

    const token = jwt.sign({id: userexist._id},process.env.JWT_SECRET)
    res.cookie("token",token)

    res.status(201).json({
        message:"login sucessfully...",
        user:{
            username: userexist.username,
            token
        }
    })

})

module.exports = router