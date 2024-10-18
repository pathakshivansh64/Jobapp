
import './App.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './shared/Home'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Jobs from './shared/Jobs'
import Browse from './shared/Browse'
import Profile from './shared/Profile'
import Details from './shared/Details'
import Companies from './admin/Companies'
import Createcompanies from './admin/Createcompanies'
import CompanySetup from './admin/CompanySetup'
import AdminJobs from './admin/AdminJobs'
import PostJob from './admin/PostJob'
import Applicants from './admin/Applicants'
import ProtectedRoute from './admin/ProtectedRoute'
import GoogleLogin from './auth/GoogleLogin'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useGoogleLogin } from '@react-oauth/google'
import Editjob from './admin/Editjob'


export const GoogleAuthwrapper=()=>{
  return(
    <GoogleOAuthProvider clientId='230428247417-m64t60m5dovaoumfehmon0bqmtr0up1p.apps.googleusercontent.com'>
     <GoogleLogin></GoogleLogin>
    </GoogleOAuthProvider>
  )
}


const approuter=createBrowserRouter([
  
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/googleLogin',
    element:<GoogleAuthwrapper/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/details/:id',
    element:<Details/>
  },

  //for admins
  {
    path:'/admin/companies',
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:'/admin/companies/create',
    element:<ProtectedRoute><Createcompanies/></ProtectedRoute>
  },
  {
    path:'/admin/companies/:id',
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
  },
  {
    path:'/admin/jobs',
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
  },
   {
    path:'/admin/jobs/create',
    element:<ProtectedRoute><PostJob/></ProtectedRoute>
  },
  {
    path:'/admin/jobs/:id/applicants',
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
  },
  {
    path:'/admin/jobs/:id',
    element:<ProtectedRoute><Editjob/></ProtectedRoute>
  }
])

function App() {
 

  return (
    <>
     <div >
    <RouterProvider router={approuter}/>
    
    </div>
    </>
  )
}

export default App
