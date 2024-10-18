import { companyapi } from '@/const'
import { setsinglecompany } from '@/redux/companyslice';

import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetcompanybyID(companyID) {
      const dispatch=useDispatch();
    useEffect(()=>{
        const fetchcompany=async ()=>{
          try {
             const res=await axios.post(`${companyapi}/getcompanybyID/${companyID}`,"",{ withCredentials:true})
            
             if(res.data.success){
              dispatch(setsinglecompany(res.data.company))
             }
          } catch (error) {
            toast.error(error.response.data.message)
            
          }
        }

        fetchcompany();
    },[companyID,dispatch])
 
}

export default useGetcompanybyID
