'use strict'


const logger = require('../../utils/logger');

//const userService = new UserService();

let classInstance = {};
class userValidator {

    constructor() {        
        classInstance = this;
    }

    getAllUsers(req, res) {
        try {
           
        }catch(e){
            logger.error({"transactionId":req.transactionId,"error": err.message});
            return res.status(500).send({ success: false, message: 'Unexpected error while validating all users request' });
        }
    }

    createUser(req, res) {
        try {
          
        }catch(e){
            logger.error({"transactionId":req.transactionId,"error": err.message});
            return res.send({ success: false, message: 'Unexpected error while validating create user' });
        }
    }

    updateUser(req, res) {
        try {
           
        }catch(e){
            logger.error({"transactionId":req.transactionId,"error": err.message});
            return res.send({ success: false, message: 'Unexpected error while validating update user' });
        }
    }

    deleteUser(req, res) {
        try {
           
        }catch(e){
            logger.error({"transactionId":req.transactionId,"error": err.message});
            return res.send({ success: false, message: 'Unexpected error while validating delete user' });
        }
    }   

}

module.exports = userValidator;