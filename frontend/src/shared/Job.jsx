import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Job({job}) {
  const navigate=useNavigate();
  

  const id=job._id;
  const handleclick=()=>{
     navigate(`/details/${id}`);
  }
  
  const daysagofunction=(mongodbTime)=>{
    const createdAt=new Date(mongodbTime);
    const todaydate=new Date();
    const diff=todaydate-createdAt;
    return Math.floor(diff/(1000*24*60*60));
  }
  return (
    <div className="p-3 min-h-64 rounded-md shadow-xl border bg-white border-gray-100">
      <div className="flex items-center mx-3 my-1 justify-between">
        <p className="text-sm text-gray-500">{daysagofunction(job?.createdAt)===0?"Today":`${daysagofunction(job?.createdAt)} days ago`}</p>
        <button className="border rounded-full bg-gray-100 p-1">
          <Bookmark/>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <div className=" w-12 rounded-full border  my-1">
          <img
            src={job?.company?.logo}
            alt=""
          />
        </div>

        <div>
          <h1 className="font-medium">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div className="mb-2">
        <h1 className="font-bold text-lg mx-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 mx-2">
          {job.description}
        </p>
      </div>

      <div className="flex items-center gap-2 my-1 mx-2">
        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20  cursor-pointer">
          {job.positions} Positions
        </span>
        <span  className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 cursor-pointer">
          Part Time
        </span >
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 cursor-pointer">
         {job.salary} LPA
        </span>
      </div>

      <div >
      <Button  variant="outline" onClick={handleclick} >Details</Button>
      <Button  className="border p-3 my-2 mx-2 rounded-lg text-xs bg-[#6A38C2] text-white hover:bg-black shadow-lg font-bold" >Save for Later</Button>
      </div>
    </div>
  );
}

export default Job;
