const express = require("express")
const router = express.Router()

const StaticController = require("../controllers/static.controller")
const staticController = new StaticController()

router.get("/", staticController.index)
router.get("/about", staticController.about)
router.get("/contact", staticController.contact)


module.exports = router