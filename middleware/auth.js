const jwt  = require("jsonwebtoken");
require('dotenv').config();

const authenticateToken = (req,res,next)=>{
    const token  = req.header("Authorization");

    if(!token){
        return res.status(401).json({mesaage:"Unauthorized"})
    }

    jwt.verify(token,process.env.secretKey,(err,decoded)=>{
        if(err){
            return res.status(403).json({message:"Invalid token"});
        }
        req.user = decoded;
        next()
    })
}

module.exports ={authenticateToken}