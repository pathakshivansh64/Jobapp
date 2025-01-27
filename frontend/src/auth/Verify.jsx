import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from 'react'
import { userApi } from "@/const";
import { Button } from "@/components/ui/button";
import { FallingLines } from "react-loader-spinner";
import Navbar from "@/shared/Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";



function Verify() {
    
    const {loading}=useSelector(store=>store.job)
    const{user}=useSelector(store=>store.auth)
    const navigate=useNavigate();
    const location = useLocation();
   const { email } = location.state || {};

    
   console.log(email)

  
  const [otp, setOtp] = useState('');
  

  const changeEventHandler=(e)=>{
        
        setOtp(e.target.value);
    }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${userApi}/verify`, { email, otp },{withCredentials:true});
      if(res.data.success){
        toast.success(res.data.message);
        navigate('/login');
       }
      
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
       <Navbar /> 

      <div className="flex item-center justify-center max-w-7xl mx-auto">
      
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
            <h2 className="mb-4">An Email has been sent on email:{email}</h2>
          <h1 className="font-bold text-xl mb-5">Verify OTP</h1>
          <div className="my-2">
            <label className="block">OTP:</label>
            <input
              type="text"
              placeholder="****"
              required
              value={otp}
              className="w-full my-2 h-7 p-1  border-gray-100 focus:border-gray-400 focus:ring-0 hover:border-gray-400"
              onChange={changeEventHandler}
              name="otp"
            />
          </div>

           {
                     !loading? <Button
                     type="submit"
                     className="border p-2 rounded bg-[#6A38C2] hover:bg-[#5b30a6] font-bold mt-3 w-full mb-3"
                   >
                     Verify
                   </Button>:
                   <Button
                   type="submit"
                   className=" p-2 rounded bg-white font-bold mt-3 w-full mb-3"
                   disabled
                 >
                   <FallingLines
                 color="#6A38C2"
                 width="100"
                 visible={true}
                 ariaLabel="falling-circles-loading"/>
                 </Button>
          
          
          
                    }

        </form> 
        </div> 
    </div>
  )
}

export default Verify
