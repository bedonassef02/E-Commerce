const express = require('express');

const router = express.Router();


const {UserCreationService, UserAuthenticationService, UserUpdateService, UserDeletionService} = require("../services/user.service");


const {UserRegistrationController, UserAuthenticationController} = require("../controllers/user.controller");
const userRegistrationController = new UserRegistrationController(new UserCreationService())
const userAuthenticationController = new UserAuthenticationController(new UserAuthenticationService())

router.post("/register",userRegistrationController.register)
router.post("/login",userAuthenticationController.login);

module.exports = router;