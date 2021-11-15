const express = require('express');
const lostItemsController = require('../controllers/lostItemsController');
const router = express.Router();

router
  .route('/')
  .get(lostItemsController.getLostItems)
//   .post(lostItemsController.createLostItems);

module.exports = router;
