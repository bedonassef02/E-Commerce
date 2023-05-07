const Product = require('../models/product.model');
const {IBasicController} = require("./crud/basic.controller");
const {ICreationController} = require("./crud/creation.controller");
const {IUpdatingController} = require("./crud/updating.controller");
const {IDeletionController} = require("./crud/deletion.controller");
const {OK, CREATED, DELETED} = require("../../constants");

class ProductController extends IBasicController {
    constructor(productService) {
        super()
        this.productService = productService;
    }

    async index(request, response) {
        const categories = await this.productService.getAll()
        response.status(OK).json(categories)
    }

    async show(request, response) {
        const {id} = request.params
        const product = await this.productService.getById(id)
        response.status(OK).json(product)
    }
}

class ProductCreationController extends ICreationController {

    constructor(productCreationService) {
        super()
        this.categoryCreationService = productCreationService;
    }

    async create(request, response) {
        const {name, description, category_id, price} = request.body;
        const {filename} = request.file
        const product = await this.categoryCreationService.create(new Product({
            name,
            description,
            category_id,
            price,
            image_url: "images/" + filename
        }));
        response.status(CREATED).json({product});
    }
}

class ProductUpdateController extends IUpdatingController {
    constructor(productUpdateService) {
        super()
        this.productUpdateService = productUpdateService;
    }

    async update(request, response) {
        const {id} = request.params;
        const {filename} = request.file
        const {name, description, category_id, price} = request.body;
        const category = await this.productUpdateService.update(new Product({
            id,
            name,
            description,
            category_id,
            price,
            image_url: "images/" + filename
        }));
        response.status(OK).json(category);
    }
}

class ProductDeletionController extends IDeletionController {
    constructor(categoryDeletionService) {
        super()
        this.productDeletionService = categoryDeletionService;
    }

    async destroy(request, response) {
        const {id} = request.params
        await this.productDeletionService.deleteById(id);
        response.status(DELETED).end();
    }
}


module.exports = {
    ProductController,
    ProductCreationController,
    ProductDeletionController,
    ProductUpdateController
};