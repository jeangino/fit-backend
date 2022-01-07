var userController = require("../controllers/usersController");
var express = require("express");
var router = express.Router();

router.get("/:userId", userController.user_get);
router.post("/", userController.user_create);

module.exports = router;
