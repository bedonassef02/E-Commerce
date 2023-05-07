const Category = require('../models/category.model');
const {IBasicController} = require("./crud/basic.controller");
const {IDeletionController} = require("./crud/deletion.controller");
const {ICreationController} = require("./crud/creation.controller");
const {IUpdatingController} = require("./crud/updating.controller");

class CategoryController extends IBasicController {
    constructor(categoryService) {
        super();
        this.categoryService = categoryService;
    }

    async index(request, response) {
        const categories = await this.categoryService.getAll()
        response.status(200).json(categories)
    }

    async show(request, response) {
        const {id} = request.params
        const category = await this.categoryService.getById(id)
        response.status(200).json(category)
    }
}

class CategoryDeletionController extends IDeletionController {
    constructor(categoryDeletionService) {
        super()
        this.categoryDeletionService = categoryDeletionService;
    }

    async destroy(request, response) {
        const {id} = request.params
        await this.categoryDeletionService.deleteById(id);
        response.status(204).end();
    }
}

class CategoryCreationController extends ICreationController {
    constructor(categoryCreationService) {
        super()
        this.categoryCreationService = categoryCreationService;
    }

    async create(request, response) {
        const {name} = request.body;
        const category = await this.categoryCreationService.create(new Category({name}));
        response.status(201).json({category});
    }
}

class CategoryUpdateController extends IUpdatingController {
    constructor(categoryUpdateService) {
        super()
        this.categoryUpdateService = categoryUpdateService;
    }

    async update(request, response) {
        const {id} = request.params;
        const {name} = request.body;
        const category = await this.categoryUpdateService.update(new Category({id, name}));
        response.status(200).json(category);
    }
}


module.exports = {
    CategoryController,
    CategoryDeletionController,
    CategoryCreationController,
    CategoryUpdateController
};