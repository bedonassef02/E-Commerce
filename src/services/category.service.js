function CategoryService(categoryModel) {

    this.categoryModel = categoryModel

    this.findAll = async function (response) {
        try {
            return await this.categoryModel.findAll()
        } catch (error) {
            console.log(error)
            response.status(500).json("Database Error")
        }
        return false
    }

    this.findById = async function (id, response) {
        try {
            return await this.categoryModel.findByPk(id)
        } catch (error) {
            console.log(error)
            response.status(500).json("Database Error")
        }
        return false
    }
    this.deleteById = async function (id) {
        return await this.categoryModel.destroy({
            where: {id: id}
        });
    }

    this.create = async function (category, response) {
        try {
            return await this.categoryModel.create(category);
        } catch (error) {
            console.log(error)
            response.status(400).json("Can't Create New Category")
        }
        return false
    }

    this.update = async function (id, category, response) {
        try {
            const cat = await categoryModel.findByPk(id)
            cat.name = category.name;
            cat.description = category.description;
            cat.save()
            return cat
        } catch (error) {
            console.log(error)
            response.status(400).json("Can't Update This Category")
        }
        return false
    }

}

module.exports = CategoryService