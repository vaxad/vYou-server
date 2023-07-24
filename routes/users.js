import express from 'express';
import { createUser , getMe } from '../controllers/user.js';

const router=express.Router();

router.get('/',getMe);
router.post('/',createUser);
// router.patch('/',updateUser);
// router.delete('/:id',deleteUser);
// router.patch('/:id/likeUser',likePost);
// router.patch('/:id/dislikePost',dislikePost);

export default router;