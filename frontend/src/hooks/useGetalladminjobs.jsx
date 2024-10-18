import {  jobsApi } from '@/const'
import { setadminjobs } from '@/redux/companyslice';

import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetalladminjobs() {
      const dispatch=useDispatch();
    useEffect(()=>{
        const fetchcompany=async ()=>{
          try {
             const res=await axios.post(`${jobsApi}/getadminjobs`,"",{ withCredentials:true})
             
             if(res.data.success){
              dispatch(setadminjobs(res.data.jobs))
             }
          } catch (error) {
            toast.error(error.response.data.message)
            
          }
        }

        fetchcompany();
    },[dispatch])
 
}

export default useGetalladminjobs
