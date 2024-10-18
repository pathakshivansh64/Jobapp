import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

import Job from "./Job";
import Footer from './Footer'
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { motion } from "framer-motion";
import FilterCard from "./Filtercard";

function Jobs() {
 const {alljobs,filtercards}=useSelector(store=>store.job)
 const [allfilteredcard,setallfilteredcards]=useState(alljobs);
 

 useEffect(()=>{
   if(filtercards){
   
    let filteredjobs=alljobs;
    if(filtercards[0]){
     
      filteredjobs=filteredjobs.filter((job)=>{
        return job?.location?.toLowerCase().includes(filtercards[0]?.toLowerCase())
      })
    }
    if(filtercards[1]){
     
       filteredjobs=filteredjobs.filter((job)=>{
        return job?.title?.toLowerCase().includes(filtercards[1]?.toLowerCase())
      })
    }
    if(filtercards[2]){
     
      const range=filtercards[2]?.split(" ");
  
      filteredjobs=filteredjobs.filter((job)=>{

       return job?.salary>=Number(range[1])
      })
    }
   
    setallfilteredcards(filteredjobs);
   }
   else{
    setallfilteredcards(alljobs)
   }

    
 },[filtercards])
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-8">
          <div className="">
            <FilterCard />
          </div>

          {allfilteredcard?.length <= 0 ? (
            <span>Job Not Found</span>
          ) : (
            <div className="flex-1  pb-s ">
              <div className="grid grid-cols-3 gap-6 ">
                {allfilteredcard.map((job) => (
                  <motion.div
                  initial={{opacity:0,x:100}}
                  animate={{opacity:1,x:0}}
                  exit={{opacity:0,x:-100}}
                  transition={{duration:0.3}}
                  key={job?._id}>
                  <Job  job={job}/>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer/>

    </div>
  );
}

export default Jobs;
