import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { userApi } from '@/const'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setuser } from '@/redux/authslice'
import { toast } from 'sonner'

function GoogleLogin() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [showCard, setShowCard] = useState(false);
  const [role, setRole] = useState("");
   
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {user}=useSelector((store)=>store.auth)
  
  const responseGoogle=async(authresult)=>{
   try {
    if(authresult['code']){
      
        const googleres=await axios.post(`${userApi}/google/?code=${authresult['code']}`,{role:role},{
         headers:{
          "Content-Type":"application/json"
         },
         withCredentials:true});
        if(googleres.data.success){
            
            toast.success(googleres.data.message);
            dispatch(setuser(googleres.data.user))
            navigate('/');
        }

    }
   } catch (error) {
    toast.error(error.response.data.message)
    
   }
   finally{
    setRole("")
   }
  }

    const googlelogin=useGoogleLogin({
        onSuccess:responseGoogle,
        onError:responseGoogle,
        flow:'auth-code'
    })


    const handleRoleChange = (event) => {
      setRole(event.target.value);
    };
  
    // Function to close the card
    const handleCloseCard = () => {
      setShowCard(false);
      setRole("")
      
     
      // Reset role selection when closing
    };

    const handleconfirm=()=>{
      setShowCard(false);
     
      if(role)
      googlelogin();
    }


  return (
    <div>
       <div className="w-full my-2" onClick={()=>{setShowCard(true);
       }}>
          <Button type="button" className="w-full border mt-2 border-black " variant="ghost">
          <Avatar >
                    <AvatarImage className="object-contain w-5" src="https://files.tecnoblog.net/wp-content/uploads/2021/09/logotipo_da_empresa_google.jpg" />
                  </Avatar>Continue with Google</Button>
          </div>
          {showCard && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full relative">
              <button
                onClick={handleCloseCard}
                className="absolute top-2 right-2 text-gray-600"
              >
                &#x2715;
              </button>
              <h3 className="text-2xl font-semibold mb-4">
                {selectedPlan?.name}  Choose your role
              </h3>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={role === "student"}
                    onChange={handleRoleChange}
                    className="form-radio text-blue-500 h-5 w-5 mr-2"
                  />
                  <span className="text-gray-700">Student</span>
                </label>
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={role === "recruiter"}
                    onChange={handleRoleChange}
                    className="form-radio text-blue-500 h-5 w-5 mr-2"
                  />
                  <span className="text-gray-700">Recruiter</span>
                </label>
              </div>
              <button
                onClick={handleconfirm}
                className="bg-[#6A38C2] text-white py-2 px-4 rounded hover:bg-[#5b30a6] transition w-full mt-4"
              >
                Confirm
              </button>
            </div>
          </div>
        )}
    </div>
  )
}

export default GoogleLogin
