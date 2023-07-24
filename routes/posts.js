import express from 'express';
import {getPosts, getPost, createPosts,updatePost, deletePost, likePost, dislikePost} from '../controllers/posts.js'
import { fetchuser } from '../middleware/fetchuser.js';

const router=express.Router();

router.get('/',fetchuser, getPosts);
router.post('/',fetchuser, createPosts);
router.get('/getpost/:id',fetchuser,getPost);
router.patch('/:id',fetchuser,updatePost);
router.delete('/:id',fetchuser,deletePost);
router.patch('/likePost/:id',fetchuser,likePost);
router.patch('/dislikePost/:id',fetchuser,dislikePost);

export default router;

