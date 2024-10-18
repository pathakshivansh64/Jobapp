import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import path from 'path'
import { fileURLToPath } from 'url';
dotenv.config({
path:"./.env"
})

const app = express();

const corsoptions = {
  origin: process.env.Frontend_URL||'https://jobapp-6va3.onrender.com',
  credentials: true,
};
app.use(cookieParser());
app.use(cors(corsoptions));

app.use(express.json({ extended: true,limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);

import userrouter from "./routes/user.routes.js";
import companyrouter from "./routes/company.routes.js";
import jobrouter from "./routes/jobs.routes.js";
import applicationrouter from "./routes/application.routes.js";

app.use("/user", userrouter);
app.use("/company", companyrouter);
app.use("/jobs", jobrouter);
app.use("/appliction", applicationrouter);

app.use(express.static(path.join(__dirname,"../../frontend/dist")));



export { app };
