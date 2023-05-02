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

router.get("/", productController.index);
router.post("/", upload.single('image'), productCreationController.create)
router.get("/:id", productController.getProductById);
router.delete("/:id", productDeletionController.deleteProduct)
router.put("/:id", upload.single('image'), productUpdateController.updateProduct)

module.exports = router;