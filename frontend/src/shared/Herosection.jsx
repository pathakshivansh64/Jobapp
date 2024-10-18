import { Button } from "@/components/ui/button";
import { setsearchquery } from "@/redux/jobslice";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Herosection() {
  const [query,setquery]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const searchHandler=()=>{
      dispatch(setsearchquery(query));
      navigate('/browse');
  }

  return (
    <div>
      <div className="text-center">
        <div className="flex flex-col gap-5 my-10">
          <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#c71f37] font-medium shadow-lg">
            No 1 Job Hunt website
          </span>
          <h1 className="text-5xl font-bold">
            Search, Apply  &<br />
            Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
          </h1>
          <p className="font-bold text-gray-400">
          Discover thousands of job opportunities across industries. Apply effortlessly and take the next step toward landing your dream job.
          </p>

          <div className='flex w-[40%] shadow-lg   items-center  mx-auto rounded-full bg-[#]  '>
        <input type="text" placeholder='Find Your Dream Jobs.....' className='outline-none border-none rounded-l-full  w-full h-11 pl-5' onChange={(e)=>setquery(e.target.value)}/>
        <Button onClick={searchHandler} className='bg-[#6A38C2] rounded-r-full cursor-pointer w-[10%] h-11 hover:bg-black'><Search className=" transition-transform duration-300 ease-in-out transform hover:scale-110"/></Button>
     </div>


        </div>

        

      </div>
    </div>
  );
}

export default Herosection;
