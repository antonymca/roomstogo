'use strict'


const logger = require('../../utils/logger');

let classInstance = {};
class PostValidator {

    constructor() {        
        classInstance = this;
    }

    createPost(reqObj, cb) {
        let errorBag = [];
        try {
         let title = reqObj.title;
         let content = reqObj.content;
         let userId = reqObj.userId;
         
         
         if(!title){
             // need to move to constant file to hold all the messages.
             errorBag.push({"key":"title","message":"title is mandatory, it cannot be empty"})
         }

         if(!content){
            errorBag.push({"key":"content","message":"content is mandatory, it cannot be empty"})
         }

         if(!userId){
            errorBag.push({"key":"userId","message":"userId is mandatory, it cannot be empty"})
         }

         return errorBag.length === 0 ? cb(null,true) : cb(errorBag,false);

        }catch(e){
            logger.error({"transactionId":req.transactionId,"error": e.message});
            return res.send({ success: false, message: 'Unexpected error while validating create POST' });
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

module.exports = PostValidator;