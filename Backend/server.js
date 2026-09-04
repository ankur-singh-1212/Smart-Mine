import express from "express"
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js"

dotenv.config();

const app =express();

app.use(express.json())

app.use(cors());

const PORT = process.env.PORT || 8000;


app.get("/",(req,res)=>{
    res.send("Hello!! Backend 😁")
})

app.use("/api/auth", authRoutes);

app.listen(PORT,()=>{
    console.log(`Server is runnign http://localhost:${PORT}`)
    connectDB();

})