const Category = require('../models/category.model');
const {IBasicService} = require("./crud/basic.service");
const {ICreationService} = require("./crud/creation.service");
const {IUpdatingService} = require("./crud/updating.service");
const {IDeletionService} = require("./crud/deletion.service");

class CategoryService extends IBasicService{

    async getAll() {
        try {
            const categories = await Category.findAll()
            return categories
        } catch (error) {
            return error
        }
    }

    async getById(id) {
        try {
            const category = await Category.findOne({where: {id}})
            return category
        } catch (error) {
            return error
        }
    }
}

class CategoryDeletionService extends IDeletionService{
    async deleteById(id) {
        await Category.destroy({where: {id}});
    }
}

class CategoryCreationService extends ICreationService{
    async create(category) {
        category = category.dataValues
        try {
            const createdCategory = await Category.create(category);
            return createdCategory.toJSON();
        } catch (error) {
            return error
        }
    }

}

class CategoryUpdateService extends IUpdatingService{
    async update(category) {
        const {id} = category;
        await Category.update(category, {where: {id}});
        return (await Category.findOne({where: {id}})).toJSON()
    }
}

module.exports = {
    CategoryService,
    CategoryDeletionService,
    CategoryCreationService,
    CategoryUpdateService
};