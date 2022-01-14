const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

const { validEmail } = require('../helpers/dbValidator');
const validateFields = require('../helpers/validatorFields');
const authController = require("../controllers/auth.controller");

router
  .post(
    "/register",
    [
        check("name", "The name is required").not().isEmpty(),
        check("email", "The email is not valid.").isEmail(),
        check("password","The password must have more than 8 characters").isLength({ min: 8 }),
        check("email").custom(validEmail),
        validateFields,
    ],
    authController.register
  )

  .post("/login",
  [
        check('email', 'Mail is required.').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validateFields,
  ],
  authController.login);

module.exports = router;