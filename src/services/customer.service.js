const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
function CustomerService(customerModel) {

    this.customerModel = customerModel

    this.findAll = async function (response) {
        try {
            return await this.customerModel.findAll()
        } catch (error) {
            console.log(error)
            response.status(500).json("Database Error")
        }
        return false
    }

    this.findById = async function (id, response) {
        try {
            return await this.customerModel.findByPk(id)
        } catch (error) {
            console.log(error)
            response.status(500).json("Database Error")
        }
        return false
    }
    this.deleteById = async function (id) {
        return await this.customerModel.destroy({
            where: {id: id}
        });
    }

    this.findByEmail =async function (email){
        const user = await this.customerModel.findOne({
            where: {
                email: email
            }
        })
        return user
    }

    this.create = async function (customer, response) {
        try {
            this.customerModel.findOne({
                where: {
                    email: customer.email
                }
            }).then(async user => {
                if (user) {
                    response.status(409).json("Email Already Exist")
                } else {
                    customer.password = await bcrypt.hash(customer.password, 10)
                    const user = await this.customerModel.create(customer)
                    delete user.dataValues.password
                    const expiresIn = 60 * 60 * 24 * 30; // 1 month
                    const token = jwt.sign(user.dataValues, process.env.ACCESS_TOKEN_SECRET, {expiresIn});
                    response.cookie('token', token, { httpOnly: true });
                    response.status(201).json(user)
                }
            })
        } catch (error) {
            console.log(error)
            response.status(400).json("Can't Create New Customer")
        }
        return false
    }

    this.update = async function (id, customer, response) {
        try {
            const cat = await customerModel.findByPk(id)
            cat.name = customer.name;
            cat.email = customer.email;
            cat.password = customer.password
            cat.save()
            return cat
        } catch (error) {
            console.log(error)
            response.status(400).json("Can't Update This Customer")
        }
        return false
    }

}

module.exports = CustomerService

