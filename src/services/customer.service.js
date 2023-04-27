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

    this.create = async function (customer, response) {
        try {
            return await this.customerModel.create(customer);
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

