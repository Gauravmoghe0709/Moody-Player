const authmodel =  require("../model/auth.modle")
const jwt  = require("jsonwebtoken")


async function Loginauth(req,res,next){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Unauthorised..."
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await authmodel.findOne({
            id: decoded._id
        }).select("username")
        req.user = user
        next()
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
    
}

module.exports = Loginauth