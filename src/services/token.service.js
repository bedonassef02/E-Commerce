const jwt = require("jsonwebtoken");
const checkToken = async (request) => {
    try {
        const BearerToken = request.headers.authorization
        const token = BearerToken.split(" ")[1]
        const decodedToken = await jwt.decode(token, process.env.ACCESS_TOKEN_SECRET)
        return decodedToken
    } catch (e) {
        return false
    }
}

const createToken = async (user) => {
    delete user.password
    const expiresIn = '30d'; // 30 days
    return await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn})
}

const setCookie = (token, response) => {
    response.cookie('token', token, {maxAge: 2592000000, httpOnly: true})
}

module.exports = {
    checkToken,
    createToken,
    setCookie
}