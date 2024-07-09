import express from 'express';
import { getPosts, getPost, createPosts, createPosts2, updatePost, deletePost, likePost, dislikePost } from '../controllers/posts.js'
import { fetchuser } from '../middleware/fetchuser.js';

const router = express.Router();

router.get('/', fetchuser, getPosts);
router.post('/', fetchuser, createPosts);
// router.post('/multer', fetchuser, createPosts2);
router.get('/:id', fetchuser, getPost);
router.patch('/:id', fetchuser, updatePost);
router.delete('/:id', fetchuser, deletePost);
router.patch('/like/:id', fetchuser, likePost);
router.patch('/dislike/:id', fetchuser, dislikePost);

export default router;

