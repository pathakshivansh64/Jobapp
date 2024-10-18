import Navbar from "@/shared/Navbar";
import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup} from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import axios from "axios";
import { userApi } from "@/const";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { setloading } from "@/redux/jobslice";

function Signup() {
    const {loading}=useSelector(store=>store.job)
    const{user}=useSelector(store=>store.auth)
    console.log("6",loading)
   
    const dispatch=useDispatch();
   
    const [input,setinput]=useState({
        fullname:"",
        email:"",
        password:"",
        phoneNumber:"",
        role:"",
        profilephoto:""
    })

    const changeEventHandler=(e)=>{
        setinput({...input,[e.target.name]:e.target.value})
    }

    const changeFileHandler=(e)=>{
      
        setinput({...input,profilephoto:e.target.files?.[0]})
       
    }

    const navigate=useNavigate();

   

    const submitHandler=async(e)=>{
        e.preventDefault();
      
        try {
            dispatch(setloading(true))
            const formdata=new FormData();
            formdata.append("fullname",input.fullname);
            formdata.append("email",input.email);
            formdata.append("password",input.password);
            formdata.append("phoneNumber",input.phoneNumber);
            formdata.append("role",input.role);

           
            
            if(input.profilephoto)
            formdata.append("profilephoto",input?.profilephoto);
            
            const res=await axios.post(`${userApi}/signup`,formdata,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true,
            });
           
           if(res.data.success){
            toast.success(res.data.message);
            navigate('/login');
           }
          
       
        } catch (error) {
           toast.error(error.response.data.message)
           
        }
        finally{
           dispatch(setloading(false))
        }

        
    }

    useEffect(()=>{
      if(user){
        navigate('/');
      }
    })
    console.log("7",loading)
  return (
    <div>
      <Navbar /> 
      <div className="flex item-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">SignUp</h1>
          <div className="my-2">
            <label className="block">Full Name:</label>
            <input
              type="text"
              placeholder="Jack Dorsey"
              required
              value={input.fullname}
              className="w-full my-2 h-7 p-1  border-gray-100 focus:border-gray-400 focus:ring-0 hover:border-gray-400"
              onChange={changeEventHandler}
              name="fullname"
            />
          </div>
          <div className="my-2">
            <label className="block">Email:</label>
            <input
              type="email"
              placeholder="Jack@gmail.com"
              required
              value={input.email}
              className="w-full my-2 h-7 p-1  border-gray-100 focus:border-gray-400 focus:ring-0 hover:border-gray-400"
              onChange={changeEventHandler}
              name="email"
            />
          </div>
          <div className="my-2">
            <label className="block">password:</label>
            <input
              type="password"
              placeholder=" *****"
              required
              value={input.password}
              className="w-full my-2 h-7 p-1  border-gray-100 focus:border-gray-400 focus:ring-0 hover:border-gray-400"
              onChange={changeEventHandler}
              name="password"
            />
          </div>
          <div className="my-2">
            <label className="block">Phone Number:</label>
            <input
              type="text"
              placeholder="9876++++++"
              required
              value={input.phoneNumber}
              className="w-full my-2 h-7 p-1  border-gray-100 focus:border-gray-400 focus:ring-0 hover:border-gray-400"
              onChange={changeEventHandler}
              name="phoneNumber"
            />
          </div>
        
          
          <div className="flex  items-center justify-between ">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2 ">
                <input type="radio" name="role" value="student" required checked={input.role==="student"} className="cursor-pointer"  onChange={changeEventHandler} id="student" />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" name="role"  value="recruiter" required checked={input.role==="recruiter"} className="cursor-pointer"  onChange={changeEventHandler} id="recruiter" />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>

            
          <div className='flex item-center gap-1 '>
                <label htmlFor="">Profile :</label>
                <input type="file" name="profilephoto" accept='image/*' className='cursor-pointer' onChange={changeFileHandler}  />
            </div>
          </div>


          {
           !loading? <Button
           type="submit"
           className="border p-2 rounded bg-[#6A38C2] hover:bg-[#5b30a6] font-bold mt-3 w-full mb-3"
         >
           Signup
         </Button>:
          <Button
          type="submit"
          className="border p-2 rounded bg-[#6A38C2] hover:bg-[#5b30a6] font-bold mt-3 w-full mb-3"
          disabled
        >
         <Loader></Loader>
        </Button>



          }


          <span className='text-small'>Already have an account?<Link to='/login' className="text-blue-800 " >Login</Link></span>


         
         



        </form>
      </div>
    </div>
  );
}

export default Signup;
