const express = require("express");
const lostItemsController = require("../controllers/lostItemsController");
const router = express.Router();

router
  .route("/")
  .get(lostItemsController.getLostItems)
  .post(lostItemsController.postLostItem);

router
  .route("/:id")
  .put(lostItemsController.updateLostItem)
  .delete(lostItemsController.deleteLostItem);

module.exports = router;
