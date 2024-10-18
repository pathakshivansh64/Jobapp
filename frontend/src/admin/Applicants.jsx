import Navbar from '@/shared/Navbar'
import React, { useEffect } from 'react'
import ApplicantsTable from './ApplicantsTable'
import { applicationapi } from '@/const'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setapplicants } from '@/redux/applicationslice'
import { toast } from 'sonner'
import store from '@/redux/store'

function Applicants() {
    const params=useParams();
    const dispatch=useDispatch();
    const {applicants}=useSelector(store=>store.applicant)
    
   
    useEffect( ()=>{
       const fetchallapplicants=async()=>{
        try {
           const res=await axios.post(`${applicationapi}/getapplicants/${params.id}`,"",{
            
            withCredentials:true
           })
          if(res.data.success){
           console.log(res)
            dispatch(setapplicants(res.data.job));

          }
          } catch (error) {
            toast.error(error.response.data.message)
            
          }
       }

       fetchallapplicants();
    },[])

   
  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl  mx-auto'>
        <h1 className='font-bold text-lg my-2 mx-2'>Applicants ({applicants?.appliction?.length})</h1>

        <ApplicantsTable/>


      </div>

    </div>
  )
}

export default Applicants
