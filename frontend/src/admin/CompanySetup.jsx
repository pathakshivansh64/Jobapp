import { Button } from "@/components/ui/button";
import { companyapi } from "@/const";
import useGetcompanybyID from "@/hooks/useGetcompanybyID";

import { setsinglecompany } from "@/redux/companyslice";
import { setloading } from "@/redux/jobslice";
import store from "@/redux/store";
import Navbar from "@/shared/Navbar";
import axios from "axios";
import { ArrowLeft, Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function CompanySetup() {
  const params=useParams();
  useGetcompanybyID(params.id)
    const [input,setinput]=useState({
        name:"",
        description:"",
        website:"",
        location:"",
        file:null
    })
    
    const navigate=useNavigate();
    const {loading}=useSelector(store=>store.job)
    console.log("2",loading)
    const {singlecompany}=useSelector(store=>store.company)
    const dispatch=useDispatch();

    const changeEventHandler=(e)=>{
   setinput({...input,[e.target.name]:e.target.value})
    }

    const changeFileHandler=(e)=>{
        const file=e.target.files?.[0]
        
        setinput({...input,file})


    }

    const submitHandler=async (e)=>{
        dispatch(setloading(true))
        e.preventDefault();
        
        const formdata=new FormData();
        formdata.append("name",input.name);
        formdata.append("description",input.description);
        formdata.append("website",input.website);
        formdata.append("location",input.location);
        if(input.file){
        formdata.append("file",input.file);
        }

        try {
            const res=await axios.post(`${companyapi}/updatecompany/${params.id}`,formdata,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true

            });
            if(res.data.success){
                toast.success(res.data.message);
                
                navigate('/admin/companies')
            }
        } catch (error) {
          toast.error(error.response.data.message)
           
        
        }finally{
            dispatch(setloading(false));
        }
    }
   

    useEffect(()=>{
     
      setinput({
        name:singlecompany?.name || "",
        description:singlecompany?.description || "",
        website:singlecompany?.website || "",
        location: singlecompany?.location || "",
        file:singlecompany?.file || null
      })
    },[singlecompany])

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-8">
            <Button onClick={()=>navigate('/admin/companies')} variant="outline" className="text-gray-500">
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold">Company Setup</h1>
          </div>
         <div className="grid grid-cols-2 gap-4  my-5" >
            <div className="flex-col gap-3 mt-2">
            <label  >Company Name:</label>
            <input type="text" value={input?.name} name="name" className="border p-1.5 w-full rounded-md" onChange={changeEventHandler} />
            </div>

            <div className="flex-col gap-3 mt-2">
            <label >Description:</label>
            <input type="text" value={input?.description}  name="description" className="border p-1.5 w-full rounded-md" onChange={changeEventHandler} />
            </div>

            <div className="flex-col gap-3 mt-2">
            <label  >Website:</label>
            <input type="text" value={input?.website}  name="website" className="border p-1.5 w-full rounded-md" onChange={changeEventHandler} />
            </div>

            <div className="flex-col gap-3 mt-2">
            <label  >Location:</label>
            <input type="text" value={input?.location}  name="location" className="border p-1.5 w-full rounded-md" onChange={changeEventHandler} />
            </div>

            <div className="flex-col gap-3 mt-2">
            <label  >Logo:</label>
            <input type="file"   accept="image/*" className="border p-1.5 w-full rounded-md" onChange={changeFileHandler} />
            </div>
         </div>
         {
           !loading? <Button
           type="submit"
           className="border p-2 rounded bg-[#6A38C2] hover:bg-[#5b30a6] font-bold mt-3 w-full mb-3"
         >
           Proceed
         </Button>:
          <Button
          type="submit"
          className="border p-2 rounded bg-[#6A38C2] hover:bg-[#5b30a6] font-bold mt-3 w-full mb-3"
        >
         <Loader></Loader>
        </Button>



          }

        </form>
      </div>
    </div>
  );
}

export default CompanySetup;
