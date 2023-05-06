const Product = require('../models/product.model');
const {IBasicController} = require("./crud/basic.controller");
const {ICreationController} = require("./crud/creation.controller");
const {IUpdatingController} = require("./crud/updating.controller");
const {IDeletionController} = require("./crud/deletion.controller");

class ProductController extends IBasicController{
    constructor(productService) {
        super()
        ProductController.productService = productService;
    }

    async index(request, response) {
        const categories = await ProductController.productService.getAllProducts()
        response.status(200).json(categories)
    }

    async show(request, response) {
        const {id} = request.params
        const product = await ProductController.productService.getProductById(id)
        response.status(200).json(product)
    }
}

class ProductCreationController extends ICreationController{

    constructor(productCreationService) {
        super()
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

class ProductUpdateController extends IUpdatingController{
    constructor(productUpdateService) {
        super()
        ProductUpdateController.productUpdateService = productUpdateService;
    }

    async update(request, response) {
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

class ProductDeletionController extends IDeletionController{
    constructor(categoryDeletionService) {
        super()
        ProductDeletionController.productDeletionService = categoryDeletionService;
    }

    async destroy(request, response) {
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