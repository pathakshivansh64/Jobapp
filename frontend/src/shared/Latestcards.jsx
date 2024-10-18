import React from 'react'
import Jobcards from './Jobcards';
import { useSelector } from 'react-redux';
import store from '@/redux/store';


function Latestcards() {
  const {alljobs}=useSelector(store=>store.job)
  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold p-5  my-6 '><span className='text-[#6A38C2]'>Latest & Top </span>Job Openings</h1>


    
     <div className='grid grid-cols-3 gap-8 '>
     {
        alljobs.length<=0?<span>No Jobs Avaliable</span>:alljobs.slice(0,6).map((job)=>(
          <div key={job._id} className=" transition-transform duration-300 ease-in-out transform hover:scale-110">
          <Jobcards   job={job}/>
          </div>
        ))
      }
     </div>
    

    </div>
    
  )
}

export default Latestcards
