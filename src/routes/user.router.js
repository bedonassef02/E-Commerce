const express = require('express');

const router = express.Router();

const {UserRegistrationController, UserAuthenticationController} = require("../controllers/user.controller");
const userRegistrationController = new UserRegistrationController()
const userAuthenticationController = new UserAuthenticationController()

router.post("/register",userRegistrationController.register)
router.post("/login",userAuthenticationController.login)

module.exports = router;