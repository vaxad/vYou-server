import dotenv from "dotenv"
dotenv.config({path: '.env.local'});
import bodyParser from "body-parser";
import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
const app=express();
app.use(bodyParser.json({limit:"30mb", extended:"true"}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:"true"}));
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use('/posts',postRoutes);
// app.use('/user',userRoutes);
app.use('/auth',authRoutes);

const CONNECTION_URL=process.env.REACT_APP_URL;
const PORT=process.env.PORT||5000;
mongoose.connect(CONNECTION_URL,{useNewUrlParser:"true",useUnifiedTopology:"true"})
    .then(()=>app.listen(PORT,()=>console.log(`listening to port ${PORT}`)))
    .catch((err)=>console.log(err.message));
