function ProductService(productModel) {

    this.productModel = productModel

    this.findAll = async function (response) {
        try {
            return await this.productModel.findAll()
        } catch (error) {
            console.log(error)
            response.status(500).json("Database Error")
        }
        return false
    }

    this.findById = async function (id, response) {
        try {
            return await this.productModel.findByPk(id)
        } catch (error) {
            console.log(error)
            response.status(500).json("Database Error")
        }
        return false
    }
    this.deleteById = async function (id) {
        return await this.productModel.destroy({
            where: {id: id}
        });
    }

    this.create = async function (product, response) {
        try {
            return await this.productModel.create(product);
        } catch (error) {
            console.log(error)
            response.status(400).json("Can't Create New Product")
        }
        return false
    }

    this.update = async function (id, product, response) {
        try {
            const cat = await productModel.findByPk(id)
            cat.name = product.name;
            cat.description = product.description;
            cat.save()
            return cat
        } catch (error) {
            console.log(error)
            response.status(400).json("Can't Update This Product")
        }
        return false
    }

}

module.exports = ProductService