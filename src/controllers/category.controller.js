function CategoryController(categoryService) {

    this.categoryService = categoryService

    this.index = async function (request, response) {
        const categories = await categoryService.findAll(response)
        if (categories) {
            response.status(200).json(categories)
        }
    }

    this.show = async function (request, response) {
        const {id} = request.params
        const category = await categoryService.findById(id, response)
        if (category) {
            response.status(200).json(category)
        }else{
            response.status(404).json("Category Not Found")
        }
    }

    this.delete = async function (request, response) {
        const {id} = request.params
        const isDeleted = await categoryService.deleteById(id)
        if (isDeleted == 1) {
            response.status(204).json()
        } else {
            response.status(400).json("Can't Delete This Category")
        }
    }

    this.create = async function (request, response) {
        const isCreated = await categoryService.create(request.body, response)
        if (isCreated) {
            response.status(201).json(isCreated)
        }
    }

    this.update = async function (request, response) {
        const {id} = request.params
        const isUpdated = await categoryService.update(id, request.body, response)
        if (isUpdated)
            response.json(isUpdated)
    }


}

module.exports = CategoryController