const express = require('express');

const router = express.Router();


const {
    CategoryService,
    CategoryDeletionService,
    CategoryCreationService,
    CategoryUpdateService
} = require("../services/category.service");
const {
    CategoryController,
    CategoryDeletionController,
    CategoryCreationController,
    CategoryUpdateController
} = require("../controllers/category.controller");
const ValidateToken = require("../middleware/ValidateToken")

const validateToken = new ValidateToken()
const categoryController = new CategoryController(new CategoryService())
const categoryUpdateController = new CategoryUpdateController(new CategoryUpdateService())
const categoryCreationController = new CategoryCreationController(new CategoryCreationService())
const categoryDeletionController = new CategoryDeletionController(new CategoryDeletionService())


router.get("/", categoryController.index)
router.get("/:id", categoryController.getCategoryById)
router.delete("/:id", validateToken.checkAdminToken, categoryDeletionController.deleteCategory)
router.post("/", validateToken.checkAdminToken, categoryCreationController.create)
router.put("/:id", validateToken.checkAdminToken, categoryUpdateController.updateCategory)

module.exports = router;