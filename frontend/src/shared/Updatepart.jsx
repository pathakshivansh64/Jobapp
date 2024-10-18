import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import store from "@/redux/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userApi } from "@/const";
import { toast } from "sonner";

import { Loader } from "lucide-react";
import { setloading } from "@/redux/jobslice";
import { setuser } from "@/redux/authslice";

function Updatepart({ open, setopen }) {
    const dispatch=useDispatch();
    
    const {loading}=useSelector(store=>store.job)
   
    const {user}=useSelector(store=>store.auth);
   
    const [input,setinput]=useState({
        fullname:user?.fullname,
        email:user?.email,
        phoneNumber:user?.phoneNumber,
        bio:user?.profile.bio,
        skills:user?.profile.skills?.map(skill=>skill),
        resume:user?.profile.resume,
       
    })
  
   

    const changeEventHandler=(e)=>{
    
      setinput({...input,[e.target.name]:e.target.value})
    }

    const changeFileHandler=(e)=>{
      setinput({...input,resume:e.target.files?.[0]})
    }

    const submitHandler=async (e)=>{
     e.preventDefault();

     dispatch(setloading(true));
    const formdata=new FormData
    formdata.append("fullname",input.fullname);
    formdata.append("email",input.email);
    formdata.append("phoneNumber",input.phoneNumber);
    formdata.append("bio",input.bio);
    formdata.append("skills",input.skills);
    if(resume){
      formdata.append("resume",input.resume)
    }
   
    try {
     
      const res=await axios.post(`${userApi}/updateprofile`,formdata,{
        headers:{
            "Content-Type":"multipart/form-data"
        },
        withCredentials:true,
    });
    
   
    if(res.data.success){
      toast.success(res.data.message);
      dispatch(setuser(res.data.user));
     
      
    }
   
    } catch (error) {
     
      toast.error(error.response.data.message);
      
    }finally{
      dispatch(setloading(false));
      setopen(false)
    }

    


    }

  return (
    <div>
      <Dialog open={open}>
        
        <DialogContent className="sm:max-w-auto " onInteractOutside={()=>setopen(false)} >
          <DialogHeader>
            <DialogTitle >Update Profile</DialogTitle>
            
        <DialogDescription>Make changes to your profile here. Click Update when you're done.</DialogDescription>
            <form onSubmit={submitHandler}>

              <div className="grid gap-4  py-4">

               <div className="grid grid-cols-5 items-center gap-4 my-3">
               <Label htmlFor="name">Full Name:</Label>
               <input type="text" name="fullname" id="name" value={input.fullname} onChange={changeEventHandler} className="col-span-4 p-2 border border-gray-200" />
               </div>

               <div className="grid grid-cols-5 items-center my-3">
               <Label htmlFor="email">Email:</Label>
               <input type="email" name="email" id="email" value={input.email} onChange={changeEventHandler} className="col-span-4 p-2 border border-gray-200" />
               </div>
               
               <div className="grid grid-cols-5 items-center my-3">
               <Label htmlFor="number">Number:</Label>
               <input type="text" name="phoneNumber" id="number" value={input.phoneNumber} onChange={changeEventHandler} className="col-span-4 p-2 border border-gray-200" />
               </div>

               <div className="grid grid-cols-5 items-center my-3">
               <Label htmlFor="bio">Bio:</Label>
               <input type="text" name="bio" id="bio" value={input.bio} onChange={changeEventHandler} className="col-span-4 p-2 border border-gray-200" />
               </div>

               <div className="grid grid-cols-5 items-center my-3">
               <Label htmlFor="skills">Skills:</Label>
               <input type="text" name="skills" id="skills" value={input.skills} onChange={changeEventHandler} className="col-span-4 p-2 border border-gray-200" />
               </div>

               <div className="grid grid-cols-5 items-center my-3">
               <Label htmlFor="resume">Resume:</Label>
               <input type="file" required accept="application/pdf" name="resume" id="resume" value={input?.resumerealname} onChange={changeFileHandler} className="col-span-4 p-2 cursor-pointer" />
               </div>

              </div>

              <DialogFooter>
                {
                  
                 loading?<Button
                 type="submit"
                 disabled
                 
               >
                <Loader></Loader>
               </Button>:<Button type="submit" >Update</Button>

               
                }

              </DialogFooter>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Updatepart;
