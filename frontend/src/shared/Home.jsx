import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Herosection from './Herosection'
import Categorycarosel from './Categorycarosel'
import Footer from './Footer'
import Latestcards from './Latestcards'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import { useNavigate } from 'react-router-dom'

function Home() {
  useGetAllJobs();
  
  const {user}=useSelector(store=>store.auth);
  const navigate=useNavigate();
  useEffect(()=>{
   
     if(user?.role==='recruiter'){
      navigate('/admin/companies');
     }
  },[])
  return (
    <div>
      <Navbar/>
      <Herosection/>
      <Categorycarosel/>
      
      <Latestcards/>
      
      <Footer/>
      
    </div>
  )
}

export default Home
