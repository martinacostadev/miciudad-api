const { Router } = require('express');

const lostItemsController = require('../controllers/lostItemsController');

const router = Router();

router
  .route('/')
  .get(lostItemsController.getLostItems)
  .post(lostItemsController.postLostItems);

router
  .route('/:id')
  .put(lostItemsController.updateLostItems)
  .delete(lostItemsController.deleteLostItems);

module.exports = router;
