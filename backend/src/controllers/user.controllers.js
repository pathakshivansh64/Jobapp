import { User } from "../models/user.js";
import { asynchandler } from "../utility/asynchandler.js";
import cloudinary from "../utility/Cloudinary.js";
import getdatauri from "../utility/Datauri.js";
import axios from 'axios';
import {OAuth2Client} from '../utility/googleconfig.js'




const signup=(asynchandler(async(req,res)=>{


    const {fullname,email,password,phoneNumber,role}=req.body
    
    
    if(!fullname||!email||!password||!phoneNumber||!role){
        return res.status(400).json({success:false,message:"Complete all Parameters"})
    }


    
    const file=req.file;
    let cloudresponse;
    
    if(file){
    const fileUri=getdatauri(file);

     cloudresponse=await cloudinary.uploader.upload(fileUri.content);
    }
   

    let user=await User.findOne({email})

    if(user){
        return res.status(400).json({success:false,message:"User already exists!!"})  
    }
   

    user=await User.create({
        fullname,
        email,
        password,
        phoneNumber,
        role,
        profile:{
           
           profilephoto:cloudresponse?.secure_url
           
           
            
        }
      

    })
    

    const createduser=await User.findById(user._id).select("-password");
    

    if(!createduser){
        return res.status(500).json({success:false,error:"Something went wrong while creating user"})
    }

    
    return res.status(200).json({success:true,createduser,message:"User created successfully"})

} ))

const login=(asynchandler(async(req,res)=>{
try {
        const {email,password,role}=req.body
        
        if(!email||!password||!role){
            return res.status(400).json({success:'false',message:"Complete all Parameters"})
        }
    
        let user=await User.findOne({email})
    
        if(!user){
            return res.status(400).json({success:'false',message:"Sorry!!You entered wrong credentials"})  
        }
    
        const correctPassword=await user.isPasswordCorrect(password)
    
        if(!correctPassword){
            return res.status(400).json({success:'false',message:"Sorry!!You entered wrong credentials"})
        }
    
        if(role!==user.role){
            return res.status(400).json({success:'false',message:"Account does not exist for current role"})
        }
    
      
    
        const authtoken=await user.generateauthtoken()
        
    
        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            role:user.role,
            phoneNumber:user.phoneNumber,
            profile:user?.profile
    
    
        }
    
        return res.status(200).cookie("token",authtoken,{maxAge:1*24*60*60*1000,httpsOnly:true,path:"/"}).json({success:true,user,message:"User LoggedIn Successfully!!"})
} catch (error) {
  console.log(error)  
}


}))

const logout=(asynchandler(async(req,res)=>{
  try {
   
 

     return res.status(200).cookie("token","",{maxAge:0,httpsOnly:true, }).json({success:true,message:"LoggedOut Successfully"})
  } catch (error) {
    console.log(error)
  }
}))

const updateprofile=(asynchandler(async(req,res)=>{

    try {
        const {fullname,email,phoneNumber,bio,skills}=req.body
      
    
        if(!fullname||!email||!phoneNumber||!bio||!skills){
          
            return res.status(400).json({success:false,message:"Complete all Parameters"})
        }

        const file=req.file;
       
        const fileUri=getdatauri(file);
        
        const cloudresponse=await cloudinary.uploader.upload(fileUri.content);
        
    
       
        const userid=req.id;



        
    
        let user=await User.findById(userid);
    
        if(!user){
            return res.status(400).json({success:false,message:"User is unavaliable"})
        }
        

        user.fullname=fullname,
        user.email=email,
        user.phoneNumber=phoneNumber,
        user.profile.bio=bio,
        user.profile.skills=skills.split(",")

        if(cloudresponse){
            user.profile.resume=cloudresponse.secure_url
            user.profile.resumerealname=file.originalname
        }
    
        await user.save()
    
        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
    
    
        }
       
    
        return res.status(200).json({success:true,user,message:"Profile updated successfully"})
    
    
    } catch (error) {
        console.log(error)
    }
    
}))

const googlelogin=(asynchandler(async(req,res)=>{
  try {
    const code=req.query;
    const {role}=req.body;
    
    const googleres=await OAuth2Client.getToken(code);
    
    OAuth2Client.setCredentials(googleres.tokens)

    const userres=await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleres.tokens.access_token}`)
   
    const {name,email,picture}=userres.data;

    let user=await User.findOne({email:email})

    
  
    if(!user||user.length===0){
       
        user=await User.create({
            fullname:name,
            email:email,
            role:role,
            profile:{
               
               profilephoto:picture||"https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"
               
               
                
            }
        })
    }
   
    if(user?.role!==role){
        return res.status(400).json({success:false,message:"Sorry! Account for that role does not exist from current gmail"})
    }

    
      
    const authtoken=await user.generateauthtoken()
    
    
    

    return res.status(200).cookie("token",authtoken,{maxAge:1*24*60*60*1000,httpsOnly:true,path:"/"}).json({success:true,user,message:"User LoggedIn Successfully!!"})



}
  
  catch (error) {
    console.log(error)
  }
}))

export {signup,login,logout,updateprofile,googlelogin}