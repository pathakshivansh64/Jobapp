import { Button } from '@/components/ui/button'
import Navbar from '@/shared/Navbar'
import React, { useEffect, useState } from 'react'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetallcompanies from '@/hooks/useGetallcompanies'
import { useDispatch } from 'react-redux'
import { setsearchcompany, setsearchjobs } from '@/redux/companyslice'
import useGetalladminjobs from '@/hooks/useGetalladminjobs'
import AdminTable from './AdminTable'

function Companies() {
  useGetalladminjobs();
    const navigate=useNavigate();
    const [input,setinput]=useState("");
    const dispatch=useDispatch();
    
    useEffect(()=>{
      dispatch(setsearchjobs(input));
    },[input])
  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
            <input type="text" className='w-fit p-1.5 px-3 border rounded-md' placeholder='Filter by name' onChange={(e)=>setinput(e.target.value)}/>
            <Button onClick={()=>navigate('/admin/jobs/create')}>New Jobs</Button>
        </div>

        <AdminTable/>

      </div>
    </div>
  )
}

export default Companies
