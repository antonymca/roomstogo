'use strict'

const logger = require('../../utils/logger');

let postList = [];
function Post(){      
    postList.push({"id":"1","title":"post1","content":"content1","userId":"1234"})
}

Post.prototype.getPostList = function(){
    return postList;
}

Post.prototype.createPost = function(obj){
    return postList.push(obj);
}

class PostModel {

    constructor() {
        if (!PostModel.instance) {
            PostModel.instance = new Post();
        }
    }
  
    getInstance() {
        return PostModel.instance;
    }
  
  }

  module.exports = PostModel;