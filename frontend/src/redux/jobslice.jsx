import { createSlice } from "@reduxjs/toolkit";

const jobslice=createSlice({
    name:"job",
    initialState:{
        alljobs:[],
        singlejob:null,
        appliedjobs:[],
        searchedquery:"",
        filtercards:[],
        editjob:null,
        loading:false

    },
    reducers:{
        setjobs:(state,action)=>{
            state.alljobs=action.payload
        },
        setsinglejob:(state,action)=>{
            state.singlejob=action.payload
        },
        addproduct:(state,action)=>{
            if (state.singlejob) {
                state.singlejob.appliction = [
                  ...state.singlejob.appliction,
                  action.payload, // Add the new application data
                ];
              }
        },
        setloading:(state,action)=>{
            console.log(action.payload)
            state.loading=action.payload
        },
        setappliedjob:(state,action)=>{
            state.appliedjobs=action.payload
        },
        setsearchquery:(state,action)=>{
            state.searchedquery=action.payload
        },
        setfiltercards:(state,action)=>{
            state.filtercards=action.payload
        },
        seteditjob:(state,action)=>{
            state.editjob=action.payload
        }
        
        
        

    }

})

export const {setjobs,setsinglejob,addproduct,setappliedjob,setsearchquery,setfiltercards,seteditjob,setloading} = jobslice.actions
export default jobslice.reducer;