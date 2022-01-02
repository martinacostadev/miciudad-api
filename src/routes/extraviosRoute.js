const { Router } = require('express');

const extraviosController = require('../controllers/extraviosController');

const router = Router();

router
  .route('/')
  .get(extraviosController.getLostItems)
  .post(extraviosController.postLostItems);

router
  .route('/:id')
  .put(extraviosController.updateLostItems)
  .delete(extraviosController.deleteLostItems);

module.exports = router;
