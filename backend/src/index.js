import {app} from './app.js'
import path from 'path'
import { fileURLToPath } from 'url';






import dotenv from "dotenv"
dotenv.config({
path:"./.env"
})

const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);

import connectDB from "./db.js";
connectDB()
.then(()=>{
    app.listen(`${process.env.PORT||5000}`,()=>{
        console.log(`Server is listening on port http://localhost:${process.env.PORT}`)
    })
})
.catch((error)=>{
   console.log("App is unable to listen ",error);
})

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../../frontend/dist/index.html"));
})
