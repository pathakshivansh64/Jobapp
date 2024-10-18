import { Jobs } from "../models/jobs.js";
import { asynchandler } from "../utility/asynchandler.js";



const createjobs=(asynchandler(async(req,res)=>{
   try {
     const {title,description,requirements,salary,location,jobtype,experience,positions,companyid}=req.body
    
     const userid=req.id
 
     if(!title||!description||!requirements||!salary||!location||!jobtype||!experience||!positions||!companyid){
         return res.status(400).json({success:false,message:"Please provide all details!"})
     }
 
     const job=await Jobs.create({
         title,
         description,
         requirements,
         salary,
         location,
         jobtype,
         experience,
         positions,
         company:companyid,
         createdby:userid
         
 
 
     })
 
     return res.status(200).json({success:true,job,message:"Job vacancy created successfully!"})
   } catch (error) {
    console.log(error)
   }



}))

const getalljobs=(asynchandler(async(req,res)=>{
    try {
        const keyword=req.query.keyword||""
        
        const query={
            $or:[{title:{$regex:keyword,$options:"i"}},{description:{$regex:keyword,$options:"i"}}]
        }
    
        const jobs=await Jobs.find(query).populate({
            path:"company",
            options:{sort:{createdby:-1}}
        })
        if(!jobs){
            return res.status(400).json({success:false,message:"No Jobs found!"})
        }
    
        return res.status(200).json({success:true,jobs,message:"These are relevant jobs according to your search!"})
    } catch (error) {
        console.log(error)
    }
}))

const getjobsbyID=(asynchandler(async(req,res)=>{
    try {
        const jobid=req.params.id
        const job=await Jobs.findById(jobid).populate({
            path: 'appliction',
            select:'applicant', // Populate the application field
            
    })
    
        if(!jobid){
            return res.status(400).json({success:false,message:"No matching job !"})
    
        }
    
        return res.status(200).json({success:true,job,message:"Matched search!"})
    } catch (error) {
        console.log(error)
    }
}))

const getadminjobs=(asynchandler(async(req,res)=>{
   try {
     const adminid=req.id
     const jobs=await Jobs.find({createdby:adminid}).populate({
        path:"company",
        select:'name'
     })
 
     if(!jobs){
         return res.status(400).json({success:false,message:"No jobs yet created!"})
     }
 
     return res.status(200).json({success:true,jobs,message:"jobs created by you!"})
   } catch (error) {
    console.log(error)
   }
}))

const updatejob=asynchandler(async(req,res)=>{
    try {
        const {title,description,requirements,salary,location,jobtype,experience,positions,companyid}=req.body
        if(!title||!description||!requirements||!salary||!location||!jobtype||!experience||!positions||!companyid){
            return res.status(400).json({success:false,message:"Please provide all details!"})
        }
    
        const updateddata={title,description,requirements,salary,location,jobtype,experience,positions,companyid}
        
    
        const updatedjob=await Jobs.findByIdAndUpdate(req.params.id,updateddata,{new:true})
    
        if(!updatedjob){
            return res.status(400).json({success:false,message:"Job not Found!"})
        }
    
        return res.status(200).json({success:true,message:"Job Info updated Successfully"})
    } catch (error) {
        console.log(error)
    }

})

export {createjobs,getalljobs,getjobsbyID,getadminjobs,updatejob}
