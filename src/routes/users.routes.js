const { check } = require('express-validator');
const { Router } = require("express");
const router = Router();

// const validateJWT = require('../helpers/validateJWT');
const validateFields = require('../helpers/validatorFields');
const { validUserByID } = require('../helpers/dbValidator');

const userController = require('../controllers/users.controller');

router
  .put("/:id", 
  [
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom(validUserByID),
    validateFields,
  ],
  userController.updateUser)

  .delete("/:id", 
  [
    // validateJWT,
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom(validUserByID),
    validateFields,
  ],
  userController.deleteUser)

  .get("/:id", 
  [
		// validateJWT,
		validateFields
	],
  userController.getUser)

  .get("/", [
		// validateJWT,
		validateFields
	], 
  userController.getAllUsers);

module.exports = router;