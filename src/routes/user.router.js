const express = require('express');
const router = express.Router();

const { UserCreationService, UserAuthenticationService } = require("../services/user.service");
const { UserRegistrationController, UserAuthenticationController } = require("../controllers/user.controller");

const userRegistrationController = new UserRegistrationController(new UserCreationService());
const userAuthenticationController = new UserAuthenticationController(new UserAuthenticationService());

router.post("/register", userRegistrationController.register.bind(userRegistrationController));
router.post("/login", userAuthenticationController.login.bind(userAuthenticationController));

module.exports = router;