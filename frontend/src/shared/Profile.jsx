import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge, Contact, Mail, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Appliedjobs from "./Appliedjobs";
import Updatepart from "./Updatepart";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import useGetallappliedjob from "@/hooks/useGetallappliedjob";

function Profile() {
  useGetallappliedjob();
    
    const [open,setopen]=useState(false);
    const {user}=useSelector(store=>store.auth)

    const capitalize=(string)=>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white p-5 my-5 shadow-lg rounded-xl border-gray-100">
        <div className="flex justify-between">
          <div className="flex gap-10 ">
           <div className="w-[18%] h-[auto]">
           <Avatar className="cursor-pinter mt-1 w-[100%] h-[100%] ">
              <AvatarImage className="object-contain" src={user?.profile?.profilephoto} />
            </Avatar>
           </div>

            <div>
              <h1 className="font-medium text-[250%]"> {capitalize(user?.fullname)}</h1>
              <p className="text-xl">{user?.profile.bio}</p>
            </div>
        </div>  
            <Button variant="outline" onClick={()=>setopen(true)}>
              <Pen />
            </Button>
          
        </div>
        <div className="flex gap-2 mt-5 mx-2">
            <Mail/>
            {user?.email}
        </div>
        <div className="flex gap-2 mt-2 mx-2">
            <Contact/>
            +91-{user?.phoneNumber}
        </div>
        <div className="my-3 mx-2">
            <h2 className="font-medium text-lg  ">Skills</h2>
            {
                user?.profile.skills.length!==0?user?.profile.skills.map((skill,index)=>(
                    <span key={index} className="inline-flex items-center rounded-md bg-black px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-purple-700/10 cursor-pointer mr-2 rounded">{capitalize(skill)}</span>
                )):<span>N/A</span>
            }
        </div>

        <div className="my-3 mx-2">
        <h2 className="font-medium text-lg  ">Resume</h2>

        <a target="_blank" href={user?.profile.resume} className="hover:text-blue-800 hover:underline">{user.profile.resumerealname}</a>
        </div>


      </div>
      <div className="max-w-4xl mx-auto">
        <h2 className=" font-medium text-lg my-3 mx-5">Applied Jobs</h2>
        <Appliedjobs/>
        
        
      </div>
      <Updatepart open={open} setopen={setopen}/>
    </div>

    
    
  );
}

export default Profile;
