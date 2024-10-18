import { jobsApi } from '@/const'
import {  } from '@/redux/companyslice';
import { seteditjob } from '@/redux/jobslice';

import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGeteditjob(jobid) {
      const dispatch=useDispatch();
    useEffect(()=>{
        const fetchjob=async ()=>{
          try {
             const res=await axios.post(`${jobsApi}/getjobsbyID/${jobid}`,"",{ withCredentials:true})
           
             if(res.data.success){
              dispatch(seteditjob(res.data.job))
             }
          } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
            
          }
        }

        fetchjob();
    },[jobid,dispatch])
 
}

export default useGeteditjob
