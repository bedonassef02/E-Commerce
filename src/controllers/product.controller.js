function productController(productService) {

    this.productService = productService

    this.index = async function (request, response) {
        const categories = await productService.findAll(response)
        if (categories) {
            response.status(200).json(categories)
        }
    }

    this.show = async function (request, response) {
        const {id} = request.params
        const product = await productService.findById(id, response)
        if (product) {
            response.status(200).json(product)
        }else {
            response.status(404).json("Product Not Found")
        }
    }

    this.delete = async function (request, response) {
        const {id} = request.params
        const isDeleted = await productService.deleteById(id)
        if (isDeleted == 1) {
            response.status(204).json()
        } else {
            response.status(400).json("Can't Delete This product")
        }
    }

    this.create = async function (request, response) {
        const isCreated = await productService.create(request.body, response)
        if (isCreated) {
            response.status(201).json(isCreated)
        }
    }

    this.update = async function (request, response) {
        const {id} = request.params
        const isUpdated = await productService.update(id, request.body, response)
        if (isUpdated)
            response.json(isUpdated)
    }


}

module.exports = productController