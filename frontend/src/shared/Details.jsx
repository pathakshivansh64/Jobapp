import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { applicationapi, jobsApi } from "@/const";
import { useDispatch, useSelector } from "react-redux";
import {  addproduct, setloading, setsinglejob } from "@/redux/jobslice";
import store from "@/redux/store";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { FallingLines } from "react-loader-spinner";

function Details() {
   

    const params=useParams();
    const jobId=params.id;
 
    const dispatch=useDispatch();
    const {user}=useSelector(store=>store.auth)
    const {singlejob,loading}=useSelector(store=>store.job)
    
   

    

    useEffect(()=>{
      const fetchalljobs=async ()=>{
        dispatch(setloading(true));
        try {
           const res=await axios.post(`${jobsApi}/getjobsbyID/${jobId}`,"",{ withCredentials:true})
          
           if(res.data.success){
            dispatch(setsinglejob(res.data.job))
            setapply(res.data.job.appliction?.some(application=>application.applicant===user?._id))
           }
        } catch (error) {
          toast.error(error.response.data.message)
         
        }
        finally{
          dispatch(setloading(false));
        }
      }


      fetchalljobs();
  },[jobId,dispatch,user?._id])

  let [isapplied,setapply]=useState(singlejob?.appliction?.some(appliction=>appliction.applicant==user?._id));
   

    
    const handleclick= async ()=>{
      try {
        const res=await axios.post(`${applicationapi}/applyjob/${jobId}`,"",{withCredentials:true})
        
        if(res.data.success){
          setapply(true)
          
         dispatch(addproduct({applicant:user?._id,_id:res.data.appid}))
          toast.success(res.data.message);
         
        }
        
      } catch (error) {
        toast.error(error.response.data.message)

      }
    }



  
   
  return (
    <div>
      <Navbar />
      {
        !loading?<div className="max-w-7xl mx-auto my-5 ">
        <h1 className="font-bold text-xl">{singlejob?.title}</h1>
       <div className="flex justify-between">
       <div className="flex gap-2 my-2">
        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20  cursor-pointer">
        {singlejob?.positions} Positions
        </span>
        <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 cursor-pointer">
          Part Time
        </span>
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 cursor-pointer">
        {singlejob?.salary}LPA
        </span>
        </div>
        {
            isapplied?<Button disabled>Already Applied</Button>:<Button onClick={handleclick} className="bg-[#6A38C2]  hover:black">Apply</Button>
            
           
        }
       </div>
        <div>
            <h2 className="my-4 border-b-2 pb-2 border-gray-600">Job Description</h2>

            <div>
                <h2 className="font-bold my-1">Role : <span className="font-normal pl-1 text-gray-800">{singlejob?.jobtype}</span></h2>
                <h2 className="font-bold my-1">Loaction : <span className="font-normal pl-1 text-gray-800">{singlejob?.location}</span></h2>
                <h2 className="font-bold my-1">Description : <span className="font-normal pl-1 text-gray-800"> {singlejob?.description}</span></h2>
                <h2 className="font-bold my-1">Experience : <span className="font-normal pl-1 text-gray-800">{singlejob?.experience}</span></h2>
                <h2 className="font-bold my-1">Salary : <span className="font-normal pl-1 text-gray-800">{singlejob?.salary} LPA</span></h2>
                <h2 className="font-bold my-1">Total Applicants : <span className="font-normal pl-1 text-gray-800">{singlejob?.appliction.length}</span></h2>
                <h2 className="font-bold my-1">Posted on : <span className="font-normal pl-1 text-gray-800">{singlejob?.createdAt.split("T")[0]}</span></h2>
            </div>


            
        </div>
      </div>:
      <div className="max-w-7xl mx-auto my-auto "><FallingLines
      color="#6A38C2"
      width="100"
      visible={true}
      ariaLabel="falling-circles-loading"
      /></div>
      }
    </div>
  );
}

export default Details;
