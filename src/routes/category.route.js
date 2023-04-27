const express = require("express")
const router = express.Router()

const categoryModel = require("../models/category.model")

const CategoryService = require("../services/category.service")
const categoryService = new CategoryService(categoryModel)

const CategoryController = require("../controllers/category.controller")
const categoryController = new CategoryController(categoryService)


router.route("/").get(categoryController.index).post(categoryController.create)

router.route("/:id").get(categoryController.show).put(categoryController.update).delete(categoryController.delete)


module.exports = router