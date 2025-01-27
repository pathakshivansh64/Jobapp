import { Button } from "@/components/ui/button";
import Navbar from "@/shared/Navbar";
import { ArrowLeft, Loader } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import axios from "axios";
import { jobsApi } from "@/const";
import { toast } from "sonner";
import { setloading } from "@/redux/jobslice";


function PostJob() {
  const {companies}=useSelector(store=>store.company)
 const {loading}=useSelector(store=>store.job)
 const dispatch=useDispatch();
  
 
  
  const checkcompany = false;
  const [input,setinput]=useState({
    title:"",
    description:"",
    requirements:"",
    location:"",
    salary:"",
    jobType:"",
    experience:"",
    positions:"",
    companyname:"",
    companyid:""
    })


  const changeEventhandler=(e)=>{
    setinput({...input,[e.target.name]:e.target.value})
  }

  const changevalue=(value)=>{
    const selectedcompany=companies.find((company)=>company.name.toLowerCase()===value.toLowerCase());
    
    setinput({...input,companyname:selectedcompany.name,companyid:selectedcompany._id})
   
  }



  const submitHandler=async (e)=>{
    e.preventDefault();
    dispatch( setloading(false))
    const formdata=new FormData();
    formdata.append("title",input?.title);
    formdata.append("description",input?.description);
    formdata.append("requirements",input?.requirements);
    formdata.append("location",input?.location);
    formdata.append("salary",input?.salary);
    formdata.append("experience",input?.experience);
    formdata.append("positions",input?.positions);
    formdata.append("companyname",input?.companyname);
    formdata.append("companyid",input?.companyid);
    formdata.append("jobtype",input?.jobType);
    
   try {
     const res=await axios.post(`${jobsApi}/createjobs`,formdata,{
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true
     })

     if(res.data.success){
      toast.success(res.data.message);
      const jobId=res.data.job._id;

    try {
        const sent=await axios.post(`${jobsApi}/sendemail/${jobId}`,{},{withCredentials:true})

         
    } catch (error) {
      console.log(error)
    }
      navigate('/admin/jobs')
     }
   } catch (error) {
    toast.error(error.response.data.message)
    
   }
   finally{
    dispatch(setloading(false));
   }
  
  }
  
 
  
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form className="border p-8 rounded-xl shadow-lg" onSubmit={submitHandler}>
          <div className="flex items-center gap-8">
            <Button
              onClick={() => navigate("/admin/jobs")}
              variant="outline"
              className="text-gray-500"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold">Jobs</h1>
          </div>
          <div className="grid grid-cols-2 gap-4  my-5">
            <div className="flex-col gap-3 mt-2">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={input?.title}
                onChange={changeEventhandler}
                className="border p-1.5 w-full rounded-md"
              />
            </div>

            <div className="flex-col gap-3 mt-2">
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={input?.description}
                onChange={changeEventhandler}
                className="border p-1.5 w-full rounded-md"
              />
            </div>

            <div className="flex-col gap-3 mt-2">
              <label>Requirements:</label>
              <input
                type="text"
                name="requirements"
                value={input?.requirements}
                onChange={changeEventhandler}
                className="border p-1.5 w-full rounded-md"
              />
            </div>

            <div className="flex-col gap-3 mt-2">
              <label>Job Type:</label>
              <input
                type="text"
                name="jobType"
                value={input?.jobType}
                onChange={changeEventhandler}
                className="border p-1.5 w-full rounded-md"
              />
            </div>

            <div className="flex-col gap-3 mt-2">
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={input?.location}
                onChange={changeEventhandler}
                className="border p-1.5 w-full rounded-md"
              />
            </div>

            <div className="flex-col gap-3 mt-2">
              <label>Experience Level:</label>
              <input
                type="text"
                name="experience"
                value={input?.experience}
                onChange={changeEventhandler}
                className="border p-1.5 w-full rounded-md"
              />
            </div>

            <div className="flex-col gap-3 mt-2">
              <label>No of Positions:</label>
              <input
                type="number"
                name="positions"
                value={input?.positions}
                onChange={changeEventhandler}
                className="border p-1.5 w-full rounded-md"
              />
            </div>

            <div className="flex-col gap-3 mt-2">
              <label>Salary:</label>
              <input
                type="number"
                name="salary"
                value={input?.salary}
                onChange={changeEventhandler}
                className="border p-1.5 w-full rounded-md"
              />
            </div>

            <div className="flex-col gap-3 mt-2">
              <Select onValueChange={changevalue}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                  {
                   
                    
                   companies.length >0 && companies?.map((company)=>{
                        return(
                          <div key={company._id}>
                       <SelectItem value={company?.name}   >{company?.name}</SelectItem>
                       </div>
                    )
                    })
                    
                  }
                    
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {!checkcompany ? (
            
              !loading? <Button
              type="submit"
              className="border p-2 rounded bg-[#6A38C2] hover:bg-[#5b30a6] font-bold mt-3 w-full mb-3"
              disabled={!(input?.companyname)}
            >
              Create New Job
            </Button>:
             <Button
             type="submit"
             className="border p-2 rounded bg-[#6A38C2] hover:bg-[#5b30a6] font-bold mt-3 w-full mb-3"
           >
            <Loader></Loader>
           </Button>
   
   
   
             
          ) : (
            <Button
              type="submit"
              className="border p-2 rounded bg-[#6A38C2] hover:bg-[#5b30a6] font-bold mt-3 w-full mb-3"
            >
              <Loader></Loader>
            </Button>
          )}
          {
            input?.companyname=="" && <div className="text-center mt-2 font-bold text-red-700">
        
            Please Selct a company before creating a job!
          </div>
          }
          
        </form>
      </div>
    </div>
  )
}

export default PostJob;
