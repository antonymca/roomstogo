'use strict'

const express = require('express');
const userController = require('../controllers/usercontroller');
const usercontroller = new userController();
const router = express.Router(); 

router.route('/')  
  .get(usercontroller.getAllUsers)  
  .post(usercontroller.createUser)
  .put(usercontroller.updateUser)
  .delete(usercontroller.deleteUser)


module.exports = router;
