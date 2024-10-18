import mongoose,{Schema} from "mongoose";

const applicationSchema=new Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Jobs",
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected"],
        //required:true
    }

},{timestamps:true})

export const Application=mongoose.model("Application",applicationSchema)