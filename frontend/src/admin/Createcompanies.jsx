import { Button } from '@/components/ui/button'
import { companyapi } from '@/const';
import useGetallcompanies from '@/hooks/useGetallcompanies';

import useGetcompanybyID from '@/hooks/useGetcompanybyID';
import { setsinglecompany } from '@/redux/companyslice';
import Navbar from '@/shared/Navbar'
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner';

function Createcompanies() {
  
    const navigate=useNavigate();
    const [companyname,setcompanyname]=useState();
    const dispatch=useDispatch();
    
    const registernewCompany=async()=>{
        try {
          const res=await axios.post(`${companyapi}/register`,{companyname},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
          })  ;
          if(res?.data?.success){
             toast.success(res.data.message)
             const companyID=res?.data?.company._id;
           
             navigate(`/admin/companies/${companyID}`)
          }
        } catch (error) {
          toast.error(error.response.data.message)
          
        }
    }
  return (
    <div>
      <Navbar/>
      <div className='max-w-4xl mx-auto'>
        <div className='my-7'>
            <h1 className='font-bold text-2xl'>Your Company Name</h1>
            <p className='text-gray-500'>What would you like to give your company name? you can change that later. </p>
        </div>

        <div className='flex flex-col'>
        <label className='font-bold' >Company Name:</label>
        <input type="text" className='my-2 p-2 border rounded-md' placeholder='Apple, Microsift, etc. ' onChange={(e)=>setcompanyname(e.target.value)} />
        </div>

        <div className='flex gap-3 my-3'>
            <Button variant="outline" onClick={()=>navigate('/admin/companies')}>Cancel</Button>
            <Button onClick={registernewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  )
}

export default Createcompanies
