'use strict'

const UserService = require('../service/userservice');
const UserValidator = require('../validator/uservalidation')
const logger = require('../../utils/logger');


const userValidator = new UserValidator();
const userService = new UserService();

let classInstance = {};
class UserController {

    constructor() {
        classInstance = this;
    }

    getAllUsers(req, res) {
        try {

            const onAllUsersCB = (err, resObj) => {
                if (err) {
                    res.status(500).send({ "message": "error while fetching users", data: [] })
                }
                res.status(200).send({ "data": resObj })
            }
            userService.getAllUsers(null, onAllUsersCB)

        } catch (e) {
            logger.error({ "transactionId": req.transactionId, "error": e.message });
            res.send({ success: false, message: 'Unexpected error while fetching all users' });
        }
    }

    getUserBySearch(req, res) {
        let reqObj = {};
        reqObj.searchString = req && req.params && req.params.search ? req.params.search : "";
        reqObj.type = req.query && req.query.type ? req.query.type : "";
        if (!reqObj.type || !reqObj.searchString) {
            res.status(404).send({ "data": [] })
        }
        try {
            const onUserCB = (err, resObj) => {
                if (err) {
                    return res.status(404).send({ message: "error while fetching user", data: [] });
                }
                return res.status(200).send({ "data": resObj });
            }

            userService.getUserByType(reqObj, onUserCB)
        } catch (e) {
            logger.error({ "transactionId": req.transactionId, "error": e.message });
            res.send({ success: false, message: 'Unexpected error while fetching  user by search string' });
        }
    }


    createUser(req, res) {
        try {
            let reqObj = req && req.body ? req.body : "";
            const onCreateUserValidatorCB = (err, resObj) => {
                if (err) {
                    return res.status(400).send({ data: err });
                }
                const onCreateUserCB = (err, userObj) => {
                    if (err) {console.log(err)
                        return res.status(400).send({err });
                    }
                    return res.status(201).send(userObj);
                }
                userService.createUser(reqObj, onCreateUserCB);
            }
            if (reqObj) {
                userValidator.createUser(reqObj, onCreateUserValidatorCB);
            }
        } catch (e) {
            logger.error({ "transactionId": req.transactionId, "error": e.message });
            return res.send({ success: false, message: 'Unexpected error while creating user' });
        }
    }

    updateUser(req, res) {        
        let reqObj = req && req.body ? req.body : "";
        reqObj.userId = req && req.params && req.params.userId ? req.params.userId : "";

        try {
            const onUpdateUserCB = (err, resObj) => {
                if (err) {console.log(JSON.stringify(err));
                    res.status(404).send(err)
                }
                res.status(200).send({ "message": "User updated successfully", data: [resObj] })
            }
            userService.updateUser(reqObj, onUpdateUserCB);

        } catch (e) {
            logger.error({ "transactionId": req.transactionId, "error": e });
            return res.send({ success: false, message: 'Unexpected error while updating user' });
        }
    }

    deleteUser(req, res) {
        try {
            let userId = req.params.userId;
            const onUserDeleteCB = (err, resObj) => {
                if (err) {
                    res.status(404).send({ message: "error while removing user", data: [] });
                }
                res.status(204).send({ message: "user removed successfully", data: [] });
            }
            userService.deleteUserById(userId, onUserDeleteCB);
        } catch (e) {
            logger.error({ "transactionId": req.transactionId, "error": e.message });
            return res.send({ success: false, message: 'Unexpected error while deleting user' });
        }
    }

}

module.exports = UserController;