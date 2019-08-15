'use strict'

const UserService = require('../service/userservice');
const logger = require('../../utils/logger');

//const userService = new UserService();

let classInstance = {};
class userController {

    constructor() {        
        classInstance = this;
    }

    getAllUsers(req, res) {
        try {
           res.status(200).send({"data":["userlist"]})
        }catch(e){
            logger.error({"transactionId":req.transactionId,"error": err.message});
            return res.send({ success: false, message: 'Unexpected error while fetching all users' });
        }
    }

    createUser(req, res) {
        try {
           res.status(200).send({"data":["createUser"]})
        }catch(e){
            logger.error({"transactionId":req.transactionId,"error": err.message});
            return res.send({ success: false, message: 'Unexpected error while fetching all users' });
        }
    }

    updateUser(req, res) {
        try {
           res.status(200).send({"data":["updateUser"]})
        }catch(e){
            logger.error({"transactionId":req.transactionId,"error": err.message});
            return res.send({ success: false, message: 'Unexpected error while fetching all users' });
        }
    }

    deleteUser(req, res) {
        try {
           res.status(200).send({"data":["deleteUser"]})
        }catch(e){
            logger.error({"transactionId":req.transactionId,"error": err.message});
            return res.send({ success: false, message: 'Unexpected error while fetching all users' });
        }
    }   

}

module.exports = userController;