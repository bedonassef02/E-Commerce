const User = require('../models/user.model');
const {createToken, setCookie} = require("../services/token.service");
const {CREATED, OK, NOT_FOUND, CONFLICT} = require("../../constants");


class UserRegistrationController {
    constructor(userCreationService) {
        this.userCreationService = userCreationService;
    }

    async register(request, response) {
        const {username, email, password} = request.body;
        const user = await this.userCreationService.create(new User({username, email, password, type: "user"}));
        if (!user) {
            response.status(CONFLICT).json("Email or password not valid")
        } else {
            const token = await createToken(user)
            setCookie(token, response)
            response.status(CREATED).json({user, token: token});
        }
    }
}

class UserAuthenticationController {
    constructor(userAuthenticationService) {
        this.userAuthenticationService = userAuthenticationService;
    }

    async login(request, response) {
        const {email, password} = request.body;
        const user = await this.userAuthenticationService.checkUser(new User({email, password}))
        try {
            const token = await createToken(user);
            setCookie(token, response)
            response.status(OK).json({user, token: token});
        } catch (e) {
            response.status(NOT_FOUND).json({"Login Error ": e})
        }
    }
}


module.exports = {
    UserRegistrationController,
    UserAuthenticationController,
};