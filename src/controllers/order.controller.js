const jwt = require("jsonwebtoken");
const {IBasicController} = require("./crud/basic.controller");
const {ICreationController} = require("./crud/creation.controller");
const {IDeletionController} = require("./crud/deletion.controller");
const {IUpdatingController} = require("./crud/updating.controller");

const checkToken = async (request) => {
    try {
        const BearerToken = request.headers.authorization
        const token = BearerToken.split(" ")[1]
        const decodedToken = await jwt.decode(token, process.env.ACCESS_TOKEN_SECRET)
        return decodedToken
    } catch (e) {
        return false
    }
}

class OrderController extends IBasicController {
    constructor(orderService) {
        super()
        OrderController.orderService = orderService;
    }

    async index(request, response) {
        const orders = await OrderController.orderService.getAllOrders()
        response.status(200).json(orders)
    }

    async show(request, response) {
        const {id} = request.params
        const order = await OrderController.orderService.getOrderById(id)
        response.status(200).json(order)
    }
}

class OrderCreationController extends ICreationController {
    constructor(orderCreationService) {
        super()
        OrderCreationController.orderCreationService = orderCreationService;
    }

    async create(request, response) {
        const {order} = request.body;
        const token = await checkToken(request)
        const updatedOrder = await OrderCreationController.orderCreationService.createOrder({
            ...order,
            user_id: token.id
        });
        response.status(201).json({order: updatedOrder});
    }
}

class OrderDeletionController extends IDeletionController {
    constructor(orderDeletionService) {
        super()
        OrderDeletionController.orderDeletionService = orderDeletionService;
    }

    async destroy(request, response) {
        const {id} = request.params
        await OrderDeletionController.orderDeletionService.deleteOrder(id);
        response.status(204).end();
    }
}

class OrderUpdateController extends IUpdatingController {
    constructor(orderUpdateService) {
        super()
        OrderUpdateController.orderUpdateService = orderUpdateService;
    }

    async update(request, response) {
        const {id} = request.params;
        const {order} = request.body;

        const updatedOrder = await OrderUpdateController.orderUpdateService.updateOrder({
            ...order,
            order_id: id
        });
        response.status(201).json({order: updatedOrder});
    }
}


module.exports = {
    OrderController,
    OrderCreationController,
    OrderDeletionController,
    OrderUpdateController
}