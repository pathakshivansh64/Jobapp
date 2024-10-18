import jwt from "jsonwebtoken"
import { asynchandler } from "../src/utility/asynchandler.js"





const isAuthenticated=asynchandler(async(req,res,next)=>{
  try {
      const token =req.cookies.token
    
  
  
      if(!token){
          return res.status(400).json({success:false,message:"User needs to be logged in"})
      }
  
      const decode= jwt.verify(token,process.env.jwtsecret)
      
  
      if(!decode){
          return res.status(400).json({success:false,message:"Invalid Token"}) 
      }
  
      req.id=decode.id
      next();
  
  } catch (error) {
    res.send("Authentication mai erroe hai",error)
  }

})

export default isAuthenticated