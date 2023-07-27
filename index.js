import dotenv from "dotenv";
dotenv.config({path: '.env.local'});
import express from "express";
import mongoose from "mongoose";
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';

const app=express();

app.use(express.json());
app.use(cors()) // Use this after the variable declaration

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
