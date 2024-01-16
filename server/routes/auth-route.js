const express = require("express");
const authControllers = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

router.route("/").get(authControllers.home);

router.route("/register").post(authControllers.register);
router.route("/login").post(authControllers.login);

router.route("/user").get(authMiddleware, authControllers.user);

module.exports = router;
