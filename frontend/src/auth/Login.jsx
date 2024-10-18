import Navbar from "@/shared/Navbar";
import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup} from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setuser } from "@/redux/authslice";
import { useState } from "react";
import axios from "axios";
import { userApi } from "@/const";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleAuthwrapper } from "@/App";
import { setloading } from "@/redux/jobslice";



function Login() {
  const {loading}=useSelector(store=>store.job)
  const {user}=useSelector(store=>store.auth)
  
  
  const dispatch=useDispatch();

 
  const [input,setinput]=useState({
      email:"",
      password:"",
      role:""
     
  })

 

  

    

   




  const navigate=useNavigate();

  const changeEventHandler=(e)=>{
      setinput({...input,[e.target.name]:e.target.value})
  }

  const submitHandler=async(e)=>{
      e.preventDefault();
    
      dispatch(setloading(true));
     try {
      const res=await axios.post(`${userApi}/login`,input,{
          headers:{
              "Content-Type":"application/json"
          },
          withCredentials:true,
      })
      
      
      if(res.data.success){
       
          toast(res.data.message)
         dispatch(setuser(res.data.user))
        

          navigate('/')
      }
      
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
      
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

  return (
    <div>
      <Navbar />
      <div className="flex item-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2">
            <label className="block">Email:</label>
            <input
              type="email"
              placeholder="Jack@gmail.com"
              required
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
              className="w-full my-2 h-7 p-1  border-gray-100 focus:border-gray-400 focus:ring-0 hover:border-gray-400"
              onChange={changeEventHandler}
              name="password"
            />
          </div>

          <div className="flex  items-center justify-between ">
            <RadioGroup className="flex items-center gap-4 my-5 " >
              <div className="flex items-center space-x-2">
                <input type="radio" name="role" value="student" required className="cursor-pointer" checked={input.role==="student"} onChange={changeEventHandler} id="student" />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" name="role"  value="recruiter" required className="cursor-pointer" checked={input.role==="recruiter"}   onChange={changeEventHandler} id="recruiter" />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
            </div>
   
          {
           !loading? <Button
           type="submit"
           className="border p-2 rounded bg-[#6A38C2] hover:bg-[#5b30a6] font-bold mt-3 w-full mb-3"
         >
           LogIn
         </Button>:
          <Button
          type="submit"
          className="border p-2 rounded bg-[#6A38C2] hover:bg-[#5b30a6] font-bold mt-3 w-full mb-3"
          disabled
        >
         <Loader></Loader>
        </Button>



          }


         

          <span className='text-small'>Don't have an account?<Link to='/signup' className="text-blue-800 " >SignUp</Link></span>

          <GoogleAuthwrapper/>

        </form>


       
      </div>
    </div>
  );
}

export default Login;
