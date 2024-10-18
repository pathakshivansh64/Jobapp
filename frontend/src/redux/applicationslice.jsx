import { createSlice } from "@reduxjs/toolkit";

const applicationslice=createSlice({
    name:"applicant",
    initialState:{
      applicants:[],
      
    },
    reducers:{
      setapplicants:(state,action)=>{
        state.applicants=action.payload
      },
      
    }
})

export const {setapplicants}=applicationslice.actions;
export default applicationslice.reducer;