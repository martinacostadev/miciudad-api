const { check } = require('express-validator');
const { Router } = require('express');

const router = Router();

const { existsCategoryById, existPetWithID } = require('../helpers/dbValidator');
const validateFields = require('../helpers/validatorFields');
// const validateJWT = require('../helpers/validateJWT');

const petsController = require('../controllers/pets.controller');

router
  .post(
    '/',
    [
      // validateJWT,
      check('title', 'The title is required').not().isEmpty(),
      check('breed', 'The breed of pet is required').not().isEmpty(),
      check('description', 'The description is required').not().isEmpty(),
      check('city', 'The city is required').not().isEmpty(),
      check('province', 'The province is required').not().isEmpty(),
      check('country', 'The country is required').not().isEmpty(),
      check('category', 'This is not a valid Mongo ID').isMongoId(),
      check('category').custom(existsCategoryById),
      validateFields,
    ],
    petsController.createLostPet
  )

  .get(
    '/:id',
    [
      check('id', 'This is not a valid Mongo ID').isMongoId(),
      check('id').custom(existPetWithID),
      validateFields,
    ],
    petsController.getLostPet
  )

  .get(
    '/',
    [
      // validateJWT,
      validateFields,
    ],
    petsController.getAllLostPets
  )

  .put(
    '/:id',
    [
      // validateJWT,
      check('id').custom(existPetWithID),
      validateFields,
    ],
    petsController.updateLostPet
  )

  .delete(
    '/:id',
    [
      // validateJWT,
      check('id', 'This is not a valid Mongo ID').isMongoId(),
      check('id').custom(existPetWithID),
      validateFields,
    ],
    petsController.deleteLostPet
  );

module.exports = router;
