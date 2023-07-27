import mongoose from 'mongoose';
import User from '../models/User.js';
import Post from '../models/Post.js';


export const getPosts=async (req,res)=>{
    try {
        const posts=await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const createPosts=async (req,res)=>{
    //.log(req.body)
    const id=req.user.id;
    const body=req.body;
    const newPost=new Post(body);
    const user=await User.findById(id);
    newPost.creator_id=user._id;
    newPost.creator=user.name;
    const post=await Post.create(newPost);
    //console.log(post._id);
    try {
        await post.save();
        user.posts.push(post._id);
        user.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(409).json({error:error.message});
    }
}

export const getPost=async (req,res)=>{
    const {id:_id}=req.params
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(404).send('no post with that id')
    }
    try {
        const post = await Post.findById(req.params.id);
        res.status(201).json(post);
    } catch (error) {
        res.status(409).json({error:error.message});
    }
}

export const updatePost=async (req,res)=>{
    const {id:_id}=req.params
    const userId=req.user.id;
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(404).send('no post with that id')
    }
    const post=req.body;
    const ogPost= await Post.findById(req.params.id);
    if(ogPost.creator_id!==userId){
        return res.status(401).send('Unauthorized');
    }else{
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,post,{new:true});
        res.status(201).json(updatedPost);
    } catch (error) {
        res.status(409).json({error:error.message});
    }
}
}

export const deletePost=async (req,res)=>{
    const {id:_id}=req.params
    const userId=req.user.id;
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(404).send('no post with that id')
    }
    const ogPost=await Post.findById(req.params.id);
    if(ogPost.creator_id!==userId){
        return res.status(401).send('Unauthorized');
    }else{
    try {
        await Post.findByIdAndRemove(req.params.id);
        //("hogya delete")
        res.json('post deleted');
    } catch (error) {
        res.status(409).json({error:error.message});
    }
}
}

export const likePost=async (req,res)=>{
    
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(404).send('no post with that id')
    }
    const post=req.body;
    try {
        const likedPost = await Post.findById(req.params.id);
        if(!likedPost.likes.includes(req.user.id)){
            likedPost.likes.push(req.user.id);
        }
        likedPost.save();
        res.status(200).send(likedPost);
    } catch (error) {
        res.status(409).json({error:error.message});
    }
}

export const dislikePost=async (req,res)=>{
    
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(404).send('no post with that id')
    }
    const post=req.body;
    try {
        const dislikedPost = await Post.findById(req.params.id);
        //if(dislikedPost.likes.size>0)
        if(dislikedPost.likes.includes(req.user.id)){
            dislikedPost.likes.pop(req.user.id);
        }
        dislikedPost.save();
        res.status(200).send(dislikedPost);
    } catch (error) {
        res.status(409).json({error:error.message});
    }
}