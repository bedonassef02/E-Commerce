const jwt = require("jsonwebtoken")

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

class ValidateToken {


    async checkAdminToken(request, response, next) {
        const token = await checkToken(request)
        if (token && token.type == "admin") {
            console.log(token)
            next()
        } else {
            response.status(401).json("You are not Authorized")
        }
    }

    async checkUserToken(request, response, next) {
        const token = await checkToken(request)
        if (token && token.type == "user") {
            next()
        } else {
            response.status(401).json("You are not Authorized")
        }
    }


}


module.exports = ValidateToken