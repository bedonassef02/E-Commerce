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

const validateTokenMiddleware = require("../middleware/ValidateToken");
const validateToken = new validateTokenMiddleware();

const categoryController = new CategoryController(new CategoryService());
const categoryUpdateController = new CategoryUpdateController(new CategoryUpdateService());
const categoryCreationController = new CategoryCreationController(new CategoryCreationService());
const categoryDeletionController = new CategoryDeletionController(new CategoryDeletionService());

router.get("/", categoryController.index.bind(categoryController));
router.post("/", validateToken.checkAdminToken, categoryCreationController.create.bind(categoryCreationController));

router.get("/:id", categoryController.show.bind(categoryController));

router.put("/:id", validateToken.checkAdminToken, categoryUpdateController.update.bind(categoryUpdateController));
router.delete("/:id", validateToken.checkAdminToken, categoryDeletionController.destroy.bind(categoryDeletionController));

module.exports = router;