import { applicationapi } from '@/const';
import { setappliedjob } from '@/redux/jobslice';

import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function useGetallappliedjob() {
  const dispatch=useDispatch();
  useEffect(()=>{
    const fetchappliedjob=async ()=>{
      try {
         const res=await axios.post(`${applicationapi}/getappliedjobs`,"",{ withCredentials:true})
         
         if(res.data.success){
          dispatch(setappliedjob(res.data.appliction))
         }
      } catch (error) {
        toast.error(error.response.data.message)
       
      }
    }

    fetchappliedjob();
},[dispatch])
}

export default useGetallappliedjob
