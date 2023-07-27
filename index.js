import dotenv from "dotenv";
dotenv.config({path: '.env.local'});
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';

export const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors()) 

app.use('/posts',postRoutes);
app.use('/auth',authRoutes);
app.get("/", (req, res) => {
   res.send("Server is working");
 });

const CONNECTION_URL=process.env.REACT_APP_URL;
const PORT=process.env.PORT||5000;
mongoose.connect(CONNECTION_URL,{useNewUrlParser:"true",useUnifiedTopology:"true"})
    .then(()=>app.listen(PORT,()=>console.log(`listening to port ${PORT}`)))
    .catch((err)=>console.log(err.message));
