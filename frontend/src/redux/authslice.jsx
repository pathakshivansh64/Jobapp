import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

const authslice=createSlice({
    name:"auth",
    initialState:{
        
        user:null
        
    },
    
    reducers:{
      
        setuser:(state,action)=>{
            state.user=action.payload
        }
    },
    
})


export const {setuser}=authslice.actions;
export default authslice.reducer;