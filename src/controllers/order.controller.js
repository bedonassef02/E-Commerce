
const {IBasicController} = require("./crud/basic.controller");
const {ICreationController} = require("./crud/creation.controller");
const {IDeletionController} = require("./crud/deletion.controller");
const {IUpdatingController} = require("./crud/updating.controller");
const {checkToken} = require("../services/token.service");
const {CREATED, DELETED, OK} = require("../../constants");

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
        this.orderCreationService = orderCreationService;
    }

    async create(request, response) {
        const {order} = request.body;
        const token = await checkToken(request)
        const updatedOrder = await this.orderCreationService.createOrder({
            ...order,
            user_id: token.id
        });
        response.status(CREATED).json({order: updatedOrder});
    }
}

class OrderDeletionController extends IDeletionController {
    constructor(orderDeletionService) {
        super()
        this.orderDeletionService = orderDeletionService;
    }

    async destroy(request, response) {
        const {id} = request.params
        await this.orderDeletionService.deleteOrder(id);
        response.status(DELETED).end();
    }
}

class OrderUpdateController extends IUpdatingController {
    constructor(orderUpdateService) {
        super()
        this.orderUpdateService = orderUpdateService;
    }

    async update(request, response) {
        const {id} = request.params;
        const {order} = request.body;

        const updatedOrder = await this.orderUpdateService.updateOrder({
            ...order,
            order_id: id
        });
        response.status(OK).json({order: updatedOrder});
    }
}


module.exports = {
    OrderController,
    OrderCreationController,
    OrderDeletionController,
    OrderUpdateController
}