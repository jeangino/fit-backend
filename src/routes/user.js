var userController = require("../controllers/userController");
var express = require("express");
var router = express.Router();

router.get("/", userController.user_get);
router.post("/", userController.user_post);

module.exports = router;
