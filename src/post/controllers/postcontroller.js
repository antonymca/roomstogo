'use strict'

const PostService = require('../service/postservice');
const PostValidator = require('../validator/postvalidator');
const logger = require('../../utils/logger');


const postValidator = new PostValidator();
const postService = new PostService();

let classInstance = {};
class PostController {

    constructor() {
        classInstance = this;
    }

    getAllPosts(req, res) {
        try {
            const onAllPostsCB = (err, resObj) => {
                if (err) {
                    res.status(500).send({ "message": "error while fetching posts", data: [] })
                }
                res.status(200).send({ "data": resObj })
            }
            postService.getAllPosts(null, onAllPostsCB)

        } catch (e) {
            logger.error({ "transactionId": req.transactionId, "error": e.message });
            res.send({ success: false, message: 'Unexpected error while fetching all posts' });
        }
    }

    getPostById(req, res) {
        let reqObj = {};
        reqObj.postId = req && req.params && req.params.postId ? req.params.postId : "";
        if (!reqObj.postId) {
            res.status(404).send({ "data": [] })
        }
        try {
            const onPostCB = (err, resObj) => {
                if (err) {
                    return res.status(404).send({ message: "error while fetching post by id", data: [] });
                }
                return res.status(200).send({ "data": resObj });
            }

            postService.getPostById(reqObj, onPostCB)
        } catch (e) {
            logger.error({ "transactionId": req.transactionId, "error": e.message });
            res.send({ success: false, message: 'Unexpected error while fetching  post by id ' });
        }
    }


    createPost(req, res) {
        try {
            let reqObj = req && req.body ? req.body : "";
            const onCreatePostValidatorCB = (err, resObj) => {
                if (err) {
                    return res.status(400).send({ data: err });
                }
                const onCreatePostCB = (err, userObj) => {
                    if (err) {
                        console.log(err)
                        return res.status(400).send({ err });
                    }
                    return res.status(201).send(userObj);
                }
                postService.createPost(reqObj, onCreatePostCB);
            }
            if (reqObj) {
                postValidator.createPost(reqObj, onCreatePostValidatorCB);
            }
        } catch (e) {
            logger.error({ "transactionId": req.transactionId, "error": e.message });
            return res.send({ success: false, message: 'Unexpected error while creating post' });
        }
    }

    updatePostById(req, res) {
        let reqObj = {};
        reqObj = req && req.body ? req.body : "";
        reqObj.postId = req && req.params && req.params.postId ? req.params.postId : "";

        try {
            const onUpdatePostCB = (err, resObj) => {
                if (err) {
                    console.log(JSON.stringify(err));
                    res.status(404).send(err)
                }
                res.status(200).send({ "message": "Post updated successfully", data: [resObj] })
            }
            postService.updatePostById(reqObj, onUpdatePostCB);

        } catch (e) {
            logger.error({ "transactionId": req.transactionId, "error": e });
            return res.send({ success: false, message: 'Unexpected error while updating post' });
        }
    }

    deletePostById(req, res) {
        try {
            let postId = req.params.postId;

            const onPostDeleteCB = (err, resObj) => {
                if (err) {
                    res.status(404).send(err);
                }
                res.status(204).send({ message: "post removed successfully", data: [] });
            }
            postService.deletePostById(postId, onPostDeleteCB);
        } catch (e) {
            logger.error({ "transactionId": req.transactionId, "error": e.message });
            return res.send({ success: false, message: 'Unexpected error while deleting post' });
        }
    }

}

module.exports = PostController; 