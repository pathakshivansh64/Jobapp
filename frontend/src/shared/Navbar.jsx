import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { userApi } from "@/const";
import { setuser } from "@/redux/authslice";
import store from "@/redux/store";
import axios from "axios";
import { LogOut, User2 } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Navbar() {
    const {user}=useSelector(store=>store.auth)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const cookie=document.cookie;
    
    
    useEffect(()=>{
      if(!cookie){
        dispatch(setuser(null));
        
      }
    },[])

    const logoutHandler=async ()=>{


      try {
         const res=await axios.post(`${userApi}/logout`,"",{  withCredentials:true});
        
         if(res.data.success){
          dispatch(setuser(null));
          toast.success(res.data.message);
          navigate('/login');
         }
      } catch (error) {
        
        
      
      }

    }

    const loginhandler=()=>{
      
    }
  return (
    <div>
      <div>
        <div className="bg-white flex items-center justify-between mx-auto max-w-7xl h-16 ">
          <div>
            <h1 className="text-3xl font-bold ">
              Job<span className="text-[#c71f37]">Portal</span>
            </h1>
          </div>
          <div>
            <div className="flex items-center gap-9">
              <ul className="flex font-medium items-center gap-5">
               {
                user&&user.role==='recruiter'?(
                  <>
                   <li>
                  <Link className=" transition-transform duration-300 ease-in-out transform hover:scale-110" to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link className=" transition-transform duration-300 ease-in-out transform hover:scale-110" to='/admin/jobs'>Jobs</Link>
                </li>
                  </>
                ):(
                  <>
                  <li className=" transition-transform duration-300 ease-in-out transform hover:scale-110">
                  <Link to="/">Home</Link>
                </li>
                <li className=" transition-transform duration-300 ease-in-out transform hover:scale-110">
                  <Link to='/jobs'>Jobs</Link>
                </li>
                <li className=" transition-transform duration-300 ease-in-out transform hover:scale-110">
                  <Link to="/browse">Browse</Link>
                </li>
                  </>
                )
               }


                
              </ul> 

              {
                !user?(
                  <div className="flex item-center gap-2">
                    <Link to="/login">  <Button variant="outline" onClick={loginhandler}>Login</Button></Link>
                      <Link to='/signup'> <Button  className="bg-[#6A38C2] hover:bg-[#5b30a6]">SignUp</Button></Link>
                  </div>
                ):
                <Popover>
                <PopoverTrigger>
                  <Avatar className="cursor-pinter transition-transform duration-300 ease-in-out transform hover:scale-110">
                    <AvatarImage className="object-contain" src={user?.profile?.profilephoto} />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                <div >    
                  <div className="flex gap-2 space-y-2">
                  <Avatar className="cursor-pinter">
                      <AvatarImage className="object-contain" src={user?.profile?.profilephoto} />
                    </Avatar>

                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                </div>

                      <div className="flex flex-col my-2  text-gray-600">
                      
  {
    user&&user.role==='student'?(
      <>
        <div className="flex w-fit items-center gap-2 cursor-pointer">
        <User2/>
        <Button variant="link"><Link to="/profile">Veiw Profile</Link></Button>
        </div>
      </>
    ):
    (
      <>
      </>
    )
  }                        
                           
                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                            <LogOut/>
                          <Button variant="link" onClick={logoutHandler}>Logout</Button>
                        </div>
                      </div>
                   
                  </div>
                </PopoverContent>
              </Popover>

              }

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
