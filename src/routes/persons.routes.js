const { check } = require('express-validator');
const { Router } = require('express');

const router = Router();

const { existsCategoryById, existPersonWithID } = require('../helpers/dbValidator');
const validateFields = require('../helpers/validatorFields');
// const validateJWT = require('../helpers/validateJWT');

const personsController = require('../controllers/persons.controller');

router
  .post(
    '/',
    [
      // validateJWT,
      check('firstName', 'The first name is required').not().isEmpty(),
      check('lastName', 'The last name is required').not().isEmpty(),
      check('sex', 'The sex is required').not().isEmpty(),
      check('height', 'The height is required').not().isEmpty(),
      check('weight', 'The weight is required').not().isEmpty(),
      check('ethnicity', 'The ethnicity is required').not().isEmpty(),
      check('title', 'The title is required').not().isEmpty(),
      check('description', 'The description is required').not().isEmpty(),
      check('city', 'The city is required').not().isEmpty(),
      check('province', 'The province is required').not().isEmpty(),
      check('country', 'The country is required').not().isEmpty(),
      check('category', 'This is not a valid Mongo ID').isMongoId(),
      check('category').custom(existsCategoryById),
      validateFields,
    ],
    personsController.createLostPerson
  )

  .get(
    '/:id',
    [
      check('id', 'This is not a valid Mongo ID').isMongoId(),
      check('id').custom(existPersonWithID),
      validateFields,
    ],
    personsController.getLostPerson
  )

  .get(
    '/',
    [
      // validateJWT,
      validateFields,
    ],
    personsController.getAllLostPersons
  )

  .put(
    '/:id',
    [
      // validateJWT,
      check('id').custom(existPersonWithID),
      validateFields,
    ],
    personsController.updateLostPerson
  )

  .delete(
    '/:id',
    [
      // validateJWT,
      check('id', 'This is not a valid Mongo ID').isMongoId(),
      check('id').custom(existPersonWithID),
      validateFields,
    ],
    personsController.deleteLostPerson
  );

module.exports = router;
