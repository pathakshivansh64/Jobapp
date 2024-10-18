import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { jobsApi } from '@/const'
import useGeteditjob from '@/hooks/useGeteditjob'
import { setloading } from '@/redux/jobslice'

import Navbar from '@/shared/Navbar'
import axios from 'axios'

import { ArrowLeft, Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

function Editjob() {
    
    const params=useParams();
    useGeteditjob(params.id);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {editjob}=useSelector(store=>store.job)
   
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
    const {loading}=useSelector(store=>store.job)
    
    
    const {companies}=useSelector(store=>store.company)
    const checkcompany = false;

    const changeEventhandler=(e)=>{
        setinput({...input,[e.target.name]:e.target.value})
      }
   
    const submitHandler=async(e)=>{
       
        e.preventDefault();
        dispatch(setloading(true));
    const formdata=new FormData();
    formdata.append("title",input?.title);
    formdata.append("description",input?.description);
    formdata.append("requirements",input?.requirements);
    formdata.append("location",input?.location);
    formdata.append("salary",input?.salary);
    formdata.append("experience",input?.experience);
    formdata.append("positions",input?.positions);
    formdata.append("companyid",input?.companyid);
    formdata.append("jobtype",input?.jobType);

    try {
        const res=await axios.post(`${jobsApi}/updatejob/${params.id}`,formdata,{
         headers:{
           "Content-Type":"application/json"
         },
         withCredentials:true
        })
   
        if(res.data.success){
         toast.success(res.data.message);
        
         navigate('/admin/jobs')
        }
      } catch (error) {
       toast.error(error.response.data.message)
      }
      finally{
     dispatch( setloading(false))

      }
     
    


    }

    const changevalue=(value)=>{
        const selectedcompany=companies.find((company)=>company.name.toLowerCase()===value.toLowerCase());
        
        setinput({...input,companyname:selectedcompany.name,companyid:selectedcompany._id})
       

      }


      useEffect(()=>{
      setinput({
        title:editjob?.title||"",
        description:editjob?.description||"",
        requirements:editjob?.requirements||"",
        location:editjob?.location||"",
        salary:editjob?.salary||"",
        jobType:editjob?.jobtype||"",
        experience:editjob?.experience||"",
        positions:editjob?.positions||"",
        companyname:editjob?.companyname||"",
        companyid:editjob?.companyid||""
      })
      },[editjob])
  return (
    <div>
    
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
            className={`border p-2 rounded bg-[#6A38C2] hover:bg-[#5b30a6] font-bold mt-3 w-full mb-3 `}
            disabled={!(input?.companyname)}
          >
            Update Job
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

export default Editjob
