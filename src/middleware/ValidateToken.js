
const {checkToken} = require("../services/token.service");

class ValidateToken {


    async checkAdminToken(request, response, next) {
        const token = await checkToken(request)
        if (token && token.type == "admin") {
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