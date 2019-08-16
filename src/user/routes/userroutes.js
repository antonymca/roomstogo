'use strict'

const express = require('express');
const userController = require('../controllers/usercontroller');
const usercontroller = new userController();
const router = express.Router(); 

router.route('/')  
  .get(usercontroller.getAllUsers)    
  .post(usercontroller.createUser)   
router.route('/:search') 
  .get(usercontroller.getUserBySearch)
router.route('/:userId') 
  .delete(usercontroller.deleteUser)
router.route('/:userId') 
  .put(usercontroller.updateUser) 

module.exports = router;
