'use strict'

const express = require('express');
const PostController = require('../controllers/postcontroller');
const postController = new PostController();
const router = express.Router(); 

router.route('/')  
  .get(postController.getAllPosts)    
  .post(postController.createPost)   
router.route('/:postId') 
  .get(postController.getPostById)
router.route('/:postId') 
  .delete(postController.deletePostById)
router.route('/:postId') 
  .put(postController.updatePostById) 

module.exports = router;
