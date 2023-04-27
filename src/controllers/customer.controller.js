const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
function CustomerController(customerService) {

    this.customerService = customerService

    this.register = function (request, response) {
        const customer = request.body
        customerService.create(customer,response)
    }

    this.login = async function (request, response) {
        const customer = request.body
        const user = await customerService.findByEmail(customer.email)
        console.log(user)
    }


}

module.exports = CustomerController