const Product = require('../models/product.model');
const Category = require("../models/category.model");

class ProductController {
    constructor(productService) {
        ProductController.productService = productService;
    }

    async index(request, response) {
        const categories = await ProductController.productService.getAllProducts()
        response.status(200).json(categories)
    }

    async getProductById(request, response) {
        const {id} = request.params
        const product = await ProductController.productService.getProductById(id)
        response.status(200).json(product)
    }
}

class ProductCreationController {

    constructor(productCreationService) {
        ProductCreationController.categoryCreationService = productCreationService;
    }

    async create(request, response) {
        const {name, description, category_id, price} = request.body;
        const {filename} = request.file
        const product = await ProductCreationController.categoryCreationService.createProduct(new Product({
            name,
            description,
            category_id,
            price,
            image_url: "images/" + filename
        }));
        response.status(201).json({product});
    }
}

class ProductUpdateController {
    constructor(productUpdateService) {
        ProductUpdateController.productUpdateService = productUpdateService;
    }

    async updateProduct(request, response) {
        const {id} = request.params;
        const {filename} = request.file
        const {name, description, category_id, price} = request.body;
        const category = await ProductUpdateController.productUpdateService.updateProduct(new Product({
            id,
            name,
            description,
            category_id,
            price,
            image_url: "images/" + filename
        }));
        response.status(200).json(category);
    }
}

class ProductDeletionController {
    constructor(categoryDeletionService) {
        ProductDeletionController.productDeletionService = categoryDeletionService;
    }

    async deleteProduct(request, response) {
        const {id} = request.params
        await ProductDeletionController.productDeletionService.deleteProduct(id);
        response.status(204).end();
    }
}


module.exports = {
    ProductController,
    ProductCreationController,
    ProductDeletionController,
    ProductUpdateController
};