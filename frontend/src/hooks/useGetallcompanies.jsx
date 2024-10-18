import { companyapi } from '@/const'
import { setallcompany, setsinglecompany } from '@/redux/companyslice';

import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetallcompanies(companyID) {
      const dispatch=useDispatch();
    useEffect(()=>{
        const fetchcompany=async ()=>{
          try {
             const res=await axios.post(`${companyapi}/getcompany`,"",{ withCredentials:true})
            
             if(res.data.success){
              dispatch(setallcompany(res.data.companies))
             }
          } catch (error) {
            toast.error(error.response.data.message)
          
          }
        }

        fetchcompany();
    },[companyID,dispatch])
 
}

export default useGetallcompanies
