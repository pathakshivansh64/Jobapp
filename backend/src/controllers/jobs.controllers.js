import { Jobs } from "../models/jobs.js";
import { User } from "../models/user.js";
import { asynchandler } from "../utility/asynchandler.js";
import nodemailer from "nodemailer"



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

const sendJobEmails = asynchandler(async (req, res) => {
    
    const  jobId = req.params.id;
    console.log(req.params.id,jobId);
  
    try {
      // Find the job by ID
      const job = await Jobs.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
  
      // Find all students
      const students = await User.find({ role: 'student' });
  
      // Extract email addresses from students
      const emailAddresses = students.map(student => student.email).join(', ');  // Join emails into a single string
  
      // Configure Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      // Email content
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: emailAddresses,  // List of candidate emails
        subject: `Job Opportunity: ${job.title}`,
        html: `
          <h2>${job.title}</h2>
          <p>${job.description}</p>
          <p><strong>Experience Level:</strong> ${job.experience}</p>
          <a href="https://jobapp-6va3.onrender.com/admin/jobs/${jobId}">Apply Here</a>
          <p>This job was posted by your company.</p>
        `,
      };
  
      // Send emails
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: "Emails sent to candidates successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  });
  
export {createjobs,getalljobs,getjobsbyID,getadminjobs,updatejob,sendJobEmails}
