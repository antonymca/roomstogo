'use strict'

const express = require('express');
const userRoutes = require('./user/routes/userroutes');
const postRoutes = require('./post/routes/postroutes');
const router = express.Router(); 

// health check
router.get('/hc', (req, res) => res.status(200).send({'status':'running','transactionId':req.transactionId}));

// mount user routes at /user

router.use('/user', userRoutes);


//mount post routes at /post
router.use('/post', postRoutes);

module.exports = router;
