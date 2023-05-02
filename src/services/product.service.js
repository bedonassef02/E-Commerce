const Product = require('../models/product.model');

class ProductService {

    async getAllProducts() {
        try {
            const products = await Product.findAll()
            return products
        } catch (error) {
            return error
        }
    }

    async getProductById(id) {
        try {
            const product = await Product.findOne({where: {id}})
            return product
        } catch (error) {
            return error
        }
    }
}

class ProductCreationService {
    async createProduct(product) {
        product = product.dataValues
        try {
            const createdProduct = await Product.create(product);
            return createdProduct.toJSON();
        } catch (error) {
            return error
        }
    }

}

class ProductDeletionService {
    async deleteProduct(id) {
        await Product.destroy({where: {id}});
    }
}

class ProductUpdateService {
    async updateProduct(product) {
        try {
            product = product.dataValues
            const {id} = product;
            await Product.update(product, {where: {id}});
            return (await Product.findOne({where: {id}}))
        }catch (error) {
            return error
        }
    }
}

module.exports = {
    ProductService,
    ProductCreationService,
    ProductDeletionService,
    ProductUpdateService
}