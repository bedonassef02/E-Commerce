const Category = require('../models/category.model');
const User = require("../models/user.model");

class CategoryController {
    constructor(categoryService) {
        CategoryController.categoryService = categoryService;
    }

    async index(request, response) {
        const categories = await CategoryController.categoryService.getAllCategories()
        response.status(200).json(categories)
    }

    async getCategoryById(request, response) {
        const {id} = request.params
        const category = await CategoryController.categoryService.getCategoryById(id)
        response.status(200).json(category)
    }
}

class CategoryDeletionController {
    constructor(categoryDeletionService) {
        CategoryDeletionController.categoryDeletionService = categoryDeletionService;
    }

    async deleteCategory(request, response) {
        const {id} = request.params
        await CategoryDeletionController.categoryDeletionService.deleteCategory(id);
        response.status(204).end();
    }
}

class CategoryCreationController {
    constructor(categoryCreationService) {
        CategoryCreationController.categoryCreationService = categoryCreationService;
    }

    async create(request, response) {
        const {name} = request.body;
        const category = await CategoryCreationController.categoryCreationService.createCategory(new Category({name}));
        response.status(201).json({category});
    }
}

class CategoryUpdateController {
    constructor(categoryUpdateService) {
        CategoryUpdateController.categoryUpdateService = categoryUpdateService;
    }

    async updateCategory(request, response) {
        const {id} = request.params;
        const {name} = request.body;
        const category = await CategoryUpdateController.categoryUpdateService.updateCategory(new Category({id, name}));
        response.status(200).json(category);
    }
}


module.exports = {
    CategoryController,
    CategoryDeletionController,
    CategoryCreationController,
    CategoryUpdateController
};