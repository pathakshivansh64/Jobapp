import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import store from '@/redux/store'



const ProtectedRoute=({children})=>{
    const {user}=useSelector(store=>store.auth);
    const navigate=useNavigate();

    useEffect(()=>{
        if(user===null|| user.role!=='recruiter'){
            navigate('/');
        }
    },[]);

    return (
        <>
        {children}
        </>
    )
    
}

export default ProtectedRoute;