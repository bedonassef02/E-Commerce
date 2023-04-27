const express = require("express")
const router = express.Router()

const productModel = require("../models/product.model")

const ProductService = require("../services/product.service")
const productService = new ProductService(productModel)

const ProductController = require("../controllers/product.controller")
const productController = new ProductController(productService)


router.route("/").get(productController.index).post(productController.create)

router.route("/:id").get(productController.show).put(productController.update).delete(productController.delete)


module.exports = router