import mongoose,{Schema} from "mongoose";

const jobsSchema=new Schema({
   title:{
    type:String,
    required:true
   },
   description:{
    type:String
   },
   requirements:[{
    type:String
   }],
   salary:{
    type:Number,
    required:true
   },
   location:{
    type:String,
    required:true
   },
   jobtype:{
    type:String,
    required:true
   },
   experience:{
      type:Number,
      required:true
   },
   positions:{
    type:Number,
    required:true
   },
   company:{
   type:mongoose.Schema.Types.ObjectId,
   ref:'Company',
   required:true
   },
   createdby:{
   type:mongoose.Schema.Types.ObjectId,
   ref:'User',
   required:true
   },
   appliction:[{
   type:mongoose.Schema.Types.ObjectId,
   ref:'Application',
  // required:true
   }]


},{timestamps:true})

export const Jobs=mongoose.model("Jobs",jobsSchema)