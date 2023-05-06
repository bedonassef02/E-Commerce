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

router.get("/", orderController.index);

router.post("/", validateToken.checkAdminToken, orderCreationController.create);

router.get("/:id", orderController.show);

router.delete("/:id", validateToken.checkAdminToken, orderDeletionController.destroy);
router.put("/:id", validateToken.checkAdminToken, orderUpdateController.update);

module.exports = router;