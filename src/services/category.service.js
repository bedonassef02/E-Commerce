const Category = require('../models/category.model');

class CategoryService {

    async getAllCategories() {
        try {
            const categories = await Category.findAll()
            return categories
        } catch (error) {
            return error
        }
    }

    async getCategoryById(id) {
        try {
            const category = await Category.findOne({where: {id}})
            return category
        } catch (error) {
            return error
        }
    }
}

class CategoryDeletionService {
    async deleteCategory(id) {
        await Category.destroy({where: {id}});
    }
}

class CategoryCreationService {
    async createCategory(category) {
        category = category.dataValues
        try {
            const createdCategory = await Category.create(category);
            return createdCategory.toJSON();
        } catch (error) {
            return error
        }
    }

}

class CategoryUpdateService {
    async updateCategory(category) {
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