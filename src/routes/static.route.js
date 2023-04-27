const express = require("express")
const router = express.Router()

const StaticController = require("../controllers/static.controller")
const staticController = new StaticController()

router.get("/", staticController.index)
router.get("/about", staticController.about)
router.get("/contact", staticController.contact)

const customerModel = require("../models/customer.model")

const CustomerService = require("../services/customer.service")
const customerService = new CustomerService(customerModel)

const CustomerController = require("../controllers/customer.controller")
const customerController = new CustomerController(customerService)

router.post("/register", customerController.register)
router.post("/login", customerController.login)

module.exports = router