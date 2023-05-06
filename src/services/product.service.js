const Product = require('../models/product.model');
const {IBasicService} = require("./crud/basic.service");
const {ICreationService} = require("./crud/creation.service");
const {IDeletionService} = require("./crud/deletion.service");
const {IUpdatingService} = require("./crud/updating.service");

class ProductService extends IBasicService{

    async getAll() {
        try {
            const products = await Product.findAll()
            return products
        } catch (error) {
            return error
        }
    }

    async getById(id) {
        try {
            const product = await Product.findOne({where: {id}})
            return product
        } catch (error) {
            return error
        }
    }
}

class ProductCreationService extends ICreationService{
    async create(product) {
        product = product.dataValues
        try {
            const createdProduct = await Product.create(product);
            return createdProduct.toJSON();
        } catch (error) {
            return error
        }
    }

}

class ProductDeletionService extends IDeletionService{
    async deleteById(id) {
        await Product.destroy({where: {id}});
    }
}

class ProductUpdateService extends IUpdatingService{
    async update(product) {
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