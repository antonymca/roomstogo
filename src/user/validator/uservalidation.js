'use strict'


const logger = require('../../utils/logger');
var emailvalidator = require("email-validator");

//const userService = new UserService();

let classInstance = {};
class UserValidator {

    constructor() {        
        classInstance = this;
    }

    createUser(reqObj, cb) {
        let errorBag = [];
        try {
         let userName = reqObj.username;
         let email = reqObj.email;
         
         if(!userName){
             // need to move to constant file to hold all the messages.
             errorBag.push({"key":"username","message":"username is mandatory, it cannot be empty"})
         }

         if(!email && !emailvalidator.validate(email)){
            errorBag.push({"key":"email","message":"email is mandatory, it cannot be empty or invalid"})
         }
         return errorBag.length === 0 ? cb(null,true) : cb(errorBag,false);

        }catch(e){
            logger.error({"transactionId":req.transactionId,"error": e.message});
            return res.send({ success: false, message: 'Unexpected error while validating create user' });
        }
    }    

}

module.exports = UserValidator;