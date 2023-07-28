import dotenv from "dotenv"
dotenv.config({path: '.env.local'});
import jwt from 'jsonwebtoken';
const JWT_SECRET=process.env.JWT_SECRET;

export const fetchuser=(req,res,next)=>{

    try{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send('Unauthorized');
    }
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    next();
}catch(error){
    res.status(401).send(error);
    
}
}

