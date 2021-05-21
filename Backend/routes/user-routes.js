const router = require("express").Router();
const userController = require("../controllers/user-controllers");

router.post("/login", userController.login);

router.post("/signup", userController.signup);
module.exports = router;
