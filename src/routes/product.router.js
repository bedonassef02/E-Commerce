const express = require('express');
const router = express.Router();

const {
    ProductService,
    ProductCreationService,
    ProductDeletionService,
    ProductUpdateService
} = require("../services/product.service");

const {
    ProductController,
    ProductCreationController,
    ProductDeletionController,
    ProductUpdateController
} = require("../controllers/product.controller");

const validateTokenMiddleware = require("../middleware/ValidateToken");
const validateToken = new validateTokenMiddleware();

const productController = new ProductController(new ProductService());
const productCreationController = new ProductCreationController(new ProductCreationService());
const productDeletionController = new ProductDeletionController(new ProductDeletionService());
const productUpdateController = new ProductUpdateController(new ProductUpdateService());

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "./src/uploads",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})

router.get("/", productController.index.bind(productController));

router.post("/", validateToken.checkAdminToken, upload.single('image'), productCreationController.create.bind(productCreationController))

router.get("/:id", productController.show.bind(productController));

router.delete("/:id", validateToken.checkAdminToken, productDeletionController.destroy.bind(productDeletionController))
router.put("/:id", validateToken.checkAdminToken, upload.single('image'), productUpdateController.update.bind(productUpdateController))

module.exports = router;