import mongoose from 'mongoose';
import Post from '../models/post.js'
import { ObjectId } from 'mongodb';


export const getPosts=async (req,res)=>{
    try {
        const posts=await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const createPosts=async (req,res)=>{
    const body=req.body;
    const newPost=new Post(body);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({error:error.message});
    }
}

export const updatePost=async (req,res)=>{
    const {id:_id}=req.params
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('no post with that id')
    }
    const post=req.body;
    try {
        const updatedPost = await postMessage.findByIdAndUpdate(_id,post,{new:true});
        res.status(201).json(updatedPost);
    } catch (error) {
        res.status(409).json({error:error.message});
    }
}
