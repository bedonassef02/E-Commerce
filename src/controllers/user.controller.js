const User = require('../models/user.model');
const {createToken, setCookie} = require("../services/token.service");




class UserRegistrationController {
    constructor(userCreationService) {
        UserRegistrationController.userCreationService = userCreationService;
    }

    async register(request, response) {
        const {username, email, password} = request.body;
        const user = await UserRegistrationController.userCreationService.createUser(new User({
            username,
            email,
            password
        }));
        if (!user) {
            response.status(409).json("Email or password not valid")
        } else {
            const token = await createToken(user)
            setCookie(token, response)
            response.status(201).json({user, token: token});
        }
    }
}

class UserAuthenticationController {
    constructor(userAuthenticationService) {
        UserAuthenticationController.userAuthenticationService = userAuthenticationService;
    }

    async login(request, response) {
        const {email, password} = request.body;
        const user = await UserAuthenticationController.userAuthenticationService.checkUser(new User({email, password}))
        try {
            const token = await createToken(user);
            setCookie(token, response)
            response.status(201).json({user, token: token});
        } catch (e) {
            response.status(404).json({"Login Error ": e})
        }
    }
}

class UserProfileController {
    constructor(userUpdateService) {
        this.userUpdateService = userUpdateService;
    }

    async updateProfile(request, response) {
        const {id} = request.params;
        const {username, email} = request.body;
        const user = await this.userUpdateService.updateUser(new User({id, username, email}));
        response.status(200).json(user);
    }
}

class UserDeletionController {
    constructor(userDeletionService) {
        this.userDeletionService = userDeletionService;
    }

    async deleteAccount(request, response) {
        await this.userDeletionService.deleteUser(request.params.id);
        response.status(204).end();
    }
}

module.exports = {
    UserRegistrationController,
    UserAuthenticationController,
    UserProfileController,
    UserDeletionController
};