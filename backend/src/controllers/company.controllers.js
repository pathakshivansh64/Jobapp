import { Company } from "../models/company.js";
import { asynchandler } from "../utility/asynchandler.js";
import cloudinary from "../utility/Cloudinary.js";
import getdatauri from "../utility/Datauri.js";



const registercompany=(asynchandler(async(req,res)=>{
    try {
        const {companyname}=req.body
    
        if(!companyname){
            return res.status(400).json({success:false,message:"CompanyName is Required!"})
        }
    
        let company=await Company.findOne({name:companyname})
    
        if(company){
            return res.status(400).json({success:false,message:"CompanyName Already Resgistered with same name!"})
        }
    
        company=await Company.create({
            name:companyname,
            userid:req.id
        })
    
        return res.status(200).json({success:true,company,message:"Company created Successfully!"})
    } catch (error) {
        return res.status(400).json({error,message:"Some error occured!"})
    }
}))

const getcompany=(asynchandler(async(req,res)=>{
    try {
        const userid=req.id
        const companies=await Company.find({userid})

        if(!companies){
            return res.status(400).json({success:false,message:"You have no registered comapany!"})
        }

        return res.status(200).json({success:true,companies})
    } catch (error) {
        console.log(error)
    }

    
}))

const getcompanybyID=(asynchandler(async(req,res)=>{
   try {
     const companyId=req.params.id
     
     const company=await Company.findById(companyId)
     
 
     if(!company){
         return res.status(400).json({success:false,message:"No company resgistered with that name!"})
     }
 
     return res.status(200).json({success:true,company,message:"These are the compnies relevant from your Search!"})
   } catch (error) {
    console.log(error)
   }
}))

const updatecompany=(asynchandler(async(req,res)=>{
    try {
        const {name,description,website,location}=req.body
        const file=req.file
        
        //cloudinary file abhi idhar aayega
        let cloudresponse;
    if(file){
    const fileUri=getdatauri(file);

     cloudresponse=await cloudinary.uploader.upload(fileUri.content);
    }

    
        const updateddata={name,description,website,location,logo:(cloudresponse?.secure_url||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRalke-Kf6_TB5yrnMuUYP158MBQd4bezQIxw&s")}
    
        const company=await Company.findByIdAndUpdate(req.params.id,updateddata,{new:true})
    
        if(!company){
            return res.status(400).json({success:false,message:"Company not Found!"}) 
        }
    
        return res.status(200).json({success:true,message:"Company info updated Successfully!"})
         
    
    } catch (error) {
        console.log(error)
    }
    
}))

export {registercompany,getcompany,getcompanybyID,updatecompany}