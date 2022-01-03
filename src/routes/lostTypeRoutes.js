const { Router } = require('express');

const lostTypeController = require('../controllers/lostTypeController');

const router = Router();

router
  .route('/')
  .get(lostTypeController.getLostType)
  .post(lostTypeController.postLostType);

router
  .route('/:id')
  .put(lostTypeController.updateLostType)
  .delete(lostTypeController.deleteLostType);

module.exports = router;
