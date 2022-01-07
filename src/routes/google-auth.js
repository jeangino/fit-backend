var authController = require("../controllers/authController");
var express = require("express");
var router = express.Router();

router.post("/", authController.post);
router.get("/", authController.get);
router.get("/success", authController.success);

module.exports = router;
