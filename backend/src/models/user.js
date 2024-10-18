import mongoose,{Schema} from "mongoose";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config({
path:"./.env"
})


const userSchema=new Schema({

    fullname:{
       type:String,
       required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
       
    },
    phoneNumber:{
        type:String,
       
    },
    role:{
        type:String,
        enum:['student','recruiter'],
        
    },
    profile:{
      bio:{type:String},
      skills:[{type:String}],
      resume:{type:String},
      resumerealname:{type:String},
      profilephoto:{type:String,default:"https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"},
      company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'}
    }

},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect=async function(password){
    
    return await bcrypt.compare(password,this.password)
}


userSchema.methods.generateauthtoken=async function(){
    return jwt.sign(
    {
       id:this._id,
       email:this.email,

    },process.env.jwtsecret,{expiresIn:'1d'})

}

export const User=mongoose.model("User",userSchema)