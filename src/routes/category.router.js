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

router.get("/", categoryController.index);
router.post("/", validateToken.checkAdminToken, categoryCreationController.create);

router.get("/:id", categoryController.show);

router.put("/:id", validateToken.checkAdminToken, categoryUpdateController.update);
router.delete("/:id", validateToken.checkAdminToken, categoryDeletionController.destroy);

module.exports = router;