'use strict'

const logger = require('../../utils/logger');

let userList = [];
function User(){      
    userList.push({"id":"1234","name":"antony","email":"anto"})
}

User.prototype.getUserList = function(){
    return userList;
}

User.prototype.createUser = function(obj){
    return userList.push(obj);
}

class UserModel {

    constructor() {
        if (!UserModel.instance) {
            UserModel.instance = new User();
        }
    }
  
    getInstance() {
        return UserModel.instance;
    }
  
  }

  module.exports = UserModel;