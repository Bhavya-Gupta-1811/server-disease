const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller"); 
const { signupschema, loginSchema } = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");
router.route("/").get(authControllers.home);
router.route('/register').post(validate(signupschema), authControllers.register);
router.route("/login").post(validate(loginSchema), authControllers.login);

router.route("/users").get(authMiddleware, authControllers.user);
module.exports = router;