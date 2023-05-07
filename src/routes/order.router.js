const express = require('express');
const router = express.Router();

const {
    OrderController,
    OrderCreationController,
    OrderDeletionController,
    OrderUpdateController
} = require("../controllers/order.controller");
const {
    OrderService,
    OrderCreationService,
    OrderDeletionService,
    OrderUpdateService
} = require("../services/order.service")

const validateTokenMiddleware = require("../middleware/ValidateToken");
const validateToken = new validateTokenMiddleware();

const orderController = new OrderController(new OrderService());
const orderCreationController = new OrderCreationController(new OrderCreationService());
const orderDeletionController = new OrderDeletionController(new OrderDeletionService());
const orderUpdateController = new OrderUpdateController(new OrderUpdateService());

router.get("/", orderController.index.bind(orderController));

router.post("/", validateToken.checkUserToken, orderCreationController.create.bind(orderCreationController));

router.get("/:id", orderController.show.bind(orderController));

router.delete("/:id", validateToken.checkUserToken, orderDeletionController.destroy.bind(orderDeletionController));
router.put("/:id", validateToken.checkUserToken, orderUpdateController.update.bind(orderUpdateController));

module.exports = router;