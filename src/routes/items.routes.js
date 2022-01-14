const { check } = require('express-validator');
const { Router } = require("express");

const router = Router();

const { existsCategoryById, existWithThisID } = require('../helpers/dbValidator');
const validateFields = require('../helpers/validatorFields');
// const validateJWT = require('../helpers/validateJWT');

const itemsController = require('../controllers/items.controller');

router
  .post("/", 
  [
    // validateJWT,
    check('title', 'The title is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    check('city', 'The city is required').not().isEmpty(),
    check('province', 'The province is required').not().isEmpty(),
    check('country', 'The country is required').not().isEmpty(),
    check('category', 'This is not a valid Mongo ID').isMongoId(),
    check('category').custom(existsCategoryById),
    validateFields,
],
itemsController.createLostItem)

  
  .get("/:id", 
  [
    check('id', 'This is not a valid Mongo ID').isMongoId(), 
    check('id').custom(existWithThisID), 
    validateFields
  ],
  itemsController.getLostItem)

  
  .get("/", 
  [	
    // validateJWT,
    validateFields
  ], 
  itemsController.getAllLostItems)

  
  .put("/:id", 
  [ 
    // validateJWT,
    check('id').custom( existWithThisID ),
    validateFields
  ],
  itemsController.updateLostItem)

  
  .delete("/:id", 
  [
    // validateJWT,
    check('id', 'This is not a valid Mongo ID').isMongoId(),
    check('id').custom( existWithThisID ),
    validateFields,

],
  itemsController.deleteLostItem);

module.exports = router;