import { Application } from "../models/application.js";
import { Jobs } from "../models/jobs.js";
import { asynchandler } from "../utility/asynchandler.js";



const applyjob=(asynchandler(async(req,res)=>{
    try {
        const userid=req.id
        const jobid=req.params.id
    
        const existingapplication=await Application.findOne({job:jobid,applicant:userid})
    
        if(existingapplication){
            return res.status(400).json({success:false,message:"You have already applied !"})
        }
    
        const job=await Jobs.findById(jobid)
        if(!job){
            return res.status(400).json({success:false,message:"No job avliable related to your search!"})
        }
    
        const newapplication=await Application.create({
            job:jobid,
            applicant:userid,
            status:"pending"
        })
     
        const appid=newapplication._id
        job.appliction.push(appid)
        await job.save();
        return res.status(200).json({success:true,appid,message:"Job applied Successfully!"})
    } catch (error) {
        console.log(error)
    }
}))

const getappliedjobs=asynchandler(async(req,res)=>{
    const userid=req.id
    const appliction=await Application.find({applicant:userid}).sort({createdAt:-1}).populate({
        path:"job",
        options:{sort:{createdAt:-1}},
        populate:{
            path:"company",
            options:{sort:{createdAt:-1}}
        }
    })

    if(!appliction){
        return res.status(400).json({success:false,message:"No Applications!"})
    }

    return res.status(200).json({success:true,appliction,message:"these all are applied for that!"})
})

const getapplicants=(asynchandler(async(req,res)=>{
    const jobid=req.params.id
    const job=await Jobs.findById(jobid).populate({
        path:"appliction",
        options:{sort:{createdAt:-1}},
        populate:{
            path:"applicant"
        }
    })

    if(!job){
        return res.status(400).json({success:false,message:"job not found!"})
    }

    return res.status(200).json({success:true,job,message:"all avliable jobs!"})

    
}))

const updatestatus=(asynchandler(async(req,res)=>{
    const {status}=req.body
    if(!status){
        return res.status(400).json({success:false,message:"Status is Required!"})
    }
    const applictionid=req.params.id

    const applictaion=await Application.findById(applictionid)

    if(!applictaion){
        return res.status(400).json({success:false,message:"Appliction not found!"})
    }

    applictaion.status=status.toLowerCase()
    await applictaion.save();

    return res.status(200).json({success:true,message:"Status updated Successfully!"})
}))

export {applyjob,getappliedjobs,getapplicants,updatestatus}