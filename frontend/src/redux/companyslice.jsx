import { createSlice } from "@reduxjs/toolkit";

const companyslice=createSlice({
    name:"company",
    initialState:{
        singlecompany:null,
        companies:[],
        adminjobs:[],
        searchcompany:"",
        searchjobs:""
    },
    reducers:{
        setsinglecompany:(state,action)=>{
            state.singlecompany=action.payload
        },
        setallcompany:(state,action)=>{
            state.companies=action.payload
        },
        setsearchcompany:(state,action)=>{
            state.searchcompany=action.payload
        },
        setadminjobs:(state,action)=>{
            state.adminjobs=action.payload
        },
        setsearchjobs:(state,action)=>{
            state.searchjobs=action.payload
        }

    }
})

export const {setsinglecompany,setallcompany,setsearchcompany,setadminjobs,setsearchjobs} =companyslice.actions
export default companyslice.reducer