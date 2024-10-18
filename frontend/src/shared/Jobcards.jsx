import React from 'react'
import { useNavigate } from 'react-router-dom'

function Jobcards({job}) {
  const navigate=useNavigate();
  
  return (
    <div onClick={()=>navigate(`/details/${job._id}`)} className='font-bold bg-gray-50 p-4 rounded-md shadow-xl mx-auto cursor-pointer'>
        <div>
      <h1>{job?.company?.name}</h1>
      <p>{job?.location}</p>
    </div>
    <div>
        <h1>{job?.title}</h1>
        <p>{job?.description}</p>
    </div>
   
   <div className='flex items-center gap-2 my-1'>
   <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20  " >{job.positions} Positions</span>
    <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 ">Part Time</span>
    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 ">{job.salary}LPA</span>
   </div>



    </div>
  )
}

export default Jobcards
