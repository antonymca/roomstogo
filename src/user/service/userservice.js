'use strict'

const logger = require('../../utils/logger');
const UserModel = require('../model/usermodel');
const PostService = require('../../post/service/postservice');
const uuid = require('node-uuid');


const userModel = new UserModel().getInstance();
const postService = new PostService();

let classInstance = {};
class UserService {

    constructor() {
        classInstance = this;
    }

    checkUserExist(usrList, createObj) {
        return usrList.find((user, i) => (user.name.toLowerCase() === createObj.username.toLowerCase() || user.email.toLowerCase() === createObj.email.toLowerCase()));
    }

    searchUser(searchObj) {
        let type = searchObj.type;
        let userList = userModel.getUserList();
        let currentintent = "";
        switch (type) {
            case 'name':
                currentintent = "name"
                break;
            case 'email':
                currentintent = "email"
                break;
            case 'id':
                currentintent = "id"
                break;
        }
        return userList.find((user, i) => user[currentintent] === searchObj.searchString)
    }

    findUserByIndex(userList,id){
        return userList.findIndex((user, i) => user.id === id);
    }

    deleteUsrById(id){
        let userList = userModel.getUserList();        
        const userIndex =  this.findUserByIndex(userList,id);
        if(userIndex > -1){
        userList.splice(userIndex,1);
        }
        console.log(JSON.stringify(userModel.getUserList()));        
    }

    updateUser(usrObj,cb){
        let userList = userModel.getUserList();        
        let userIndex =  this.findUserByIndex(userList,usrObj.userId);
        let user = this.checkUserExist(userList, usrObj);
        if(!user && userIndex > -1){
            usrObj && usrObj.username ?  userList[userIndex].name = usrObj.username : "";
            usrObj && usrObj.email ? userList[userIndex].email = usrObj.email : "";
            
        }else if(user){
            return cb({message:"user exist with the same name or email, please check it",data:[]});

        }else{
            return cb({message:"invalid user to update",data:[]}); 
        }console.log("entered entered");
        return cb(null,userList[userIndex]);
    }

    createUser(usrObj, cb) {
        let userList = userModel.getUserList();
        let user = this.checkUserExist(userList, usrObj);
        if (user) {
            return cb({ "message": "user already exist", "data": [user] });
        }
        let obj = {};
        obj.id = uuid.v1();
        obj.name = usrObj.username;
        obj.email = usrObj.email;
        userModel.createUser(obj);
        userList = userModel.getUserList();
        return cb(null, { "message": "user created successfully", "data": [obj] });
    }

    getAllUsers(reqObj, cb) {
        return cb(null, userModel.getUserList());
    }

    getpostsByUser(id){
       return postService.getPostById(id);
    }

    getUserByType(reqObj, cb) {
        let finalResponse = {};
        let allPost =[];
        let userObject = this.searchUser(reqObj);
        finalResponse["user"] = userObject;
        if(userObject){
        let allPost = postService.getPostByUserId(userObject.id);
        if(allPost.length === 1){
            finalResponse["posts"] = [allPost];
        }else finalResponse["posts"] = allPost;
        }
        return cb(null, finalResponse);
    }

    deleteUserById(userId, cb){
        this.deleteUsrById(userId);
        postService.deletePostByUserId(userId);
        return cb(null, "deleted");
    }

}
module.exports = UserService;