const express = require('express');
const UserService = require('../../services/user.service');
const User = require('../../models/user.model');

const userService = new UserService();

class AdminController {

    async getAllUsers(request, response) {
        const users = await userService.getAllUsers();
        response.status(200).json(users);
    }

    async getUserById(request, response) {
        const user = await userService.getUserById(request.params.id);
        if (user === null) {
            response.status(404).end();
        } else {
            response.status(200).json(user);
        }
    }

}