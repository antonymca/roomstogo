'use strict'

const logger = require('../../utils/logger');
const PostModel = require('../model/postmodel');
const uuid = require('node-uuid');
var _ = require('lodash');

var postModel = new PostModel().getInstance();

let classInstance = {};
class PostService {

    constructor() {
        classInstance = this;
    }

    findPostByIndex(postList, id) {
        return postList.findIndex((post, i) => post.id === id);
    }

    deletePosById(id) {
        let postList = postModel.getPostList();
        const postIndex = this.findPostByIndex(postList, id);
        if (postIndex > -1) {
            postList.splice(postIndex, 1);
        }
        console.log(JSON.stringify(postModel.getPostList()));
        return postIndex;
    }


    deletePosByUserId(userId) {
        let postList = postModel.getPostList();
        _.forEachRight(postList, function (post, i) {
            console.log(post);
            if (post.userId === userId) {
                postList.splice(i, 1)
            }
        });
    }

    updatePostById(postObj, cb) {
        let postList = postModel.getPostList();
        let postIndex = this.findPostByIndex(postList, postObj.postId);
        postObj && postObj.title ? postList[postIndex].title = postObj.title : "";
        postObj && postObj.content ? postList[postIndex].content = postObj.content : "";
        return cb(null, postList[postIndex]);
    }

    createPost(postObj, cb) {
        let postList = postModel.getPostList();

        let obj = {};
        obj.id = uuid.v1();
        obj.title = postObj.title;
        obj.content = postObj.content;
        obj.userId = postObj.userId;
        postModel.createPost(obj);

        postList = postModel.getPostList();
        return cb(null, { "message": "post created successfully", "data": [obj] });
    }

    getAllPosts(reqObj, cb) {
        return cb(null, postModel.getPostList());
    }

    getPostById(reqObj, cb) {
        let postList = postModel.getPostList();
        return cb(null, postList[this.findPostByIndex(postList, reqObj.postId)]);
    }

    getPostByUserId(userId, cb) {
        let postList = postModel.getPostList();
        return postList.filter((pos) => pos.userId === userId);
    }

    deletePostById(postId, cb) {
        let index = this.deletePosById(postId);
        const message = "";
        if (index === -1) {
            const errormsg = "post not available to delete";
            return cb({ message: errormsg }, null);
        }
        return cb(null, {});
    }

    deletePostByUserId(userId, cb) {        
        return this.deletePosByUserId(userId);
    }

}
module.exports = PostService;