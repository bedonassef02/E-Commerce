const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const {UserCreationService, UserAuthenticationService, UserUpdateService, UserDeletionService} = require("../services/user.service");
const createToken = async (user) => {
    delete user.password
    const expiresIn = '30d'; // 30 days
    return await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn})
}

const setCookie = (token,response)=>{
    response.cookie('token', token, {maxAge: 2592000000, httpOnly: true})
}

class UserRegistrationController {
    constructor() {
        this.userCreationService = new UserCreationService();
    }

    async register(request, response) {
        const {username, email, password} = request.body;
        const user = await this.userCreationService.createUser(new User({username, email, password}));
        const token = await createToken(user)
        setCookie(token,response)
        response.status(201).json({user, token: token});
    }
}

class UserAuthenticationController {
    constructor() {
        UserAuthenticationController.userAuthenticationService = new UserAuthenticationService();
    }

    async login(request, response) {
        const {email, password} = request.body;
        const user = await UserAuthenticationController.userAuthenticationService.checkUser(new User({email, password}))
        const token = await createToken(user)
        setCookie(token,response)
        response.status(201).json({user, token: token});
    }
}

class UserProfileController {
    constructor() {
        this.userUpdateService = new UserUpdateService();
    }

    async updateProfile(request, response) {
        const {id} = request.params;
        const {username, email} = request.body;
        const user = await this.userUpdateService.updateUser(new User({id, username, email}));
        response.status(200).json(user);
    }
}

class UserDeletionController {
    constructor() {
        this.userDeletionService = new UserDeletionService();
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