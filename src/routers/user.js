const express = require('express');
const auth = require('../helpers/auth')


const router = express.Router();
const userController = require('../controllers/user');


router
    .post('/login', userController.login)
    .post('/register', userController.register)
    .get("/", auth.verify, userController.getAll)
    .get("/:id", auth.verify, userController.getUserByID)
    

   


module.exports = router;