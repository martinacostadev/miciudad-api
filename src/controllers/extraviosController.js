/* eslint-disable new-cap */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
const Extravios = require('../models/Extravios');

class lostItemsController {
  async getLostItems(req, res) {
    try {
      const myLostItems = await Extravios.find();
      console.log(myLostItems);
      return res.status(200).json(myLostItems);
    } catch (error) {
      return res.status(500).json({
        message: 'Couldnt get lost',
        error,
      });
    }
  }

  async postLostItems(req, res) {
    try {
      const newLostItem = new Extravios(req.body);
      const lostItem = await newLostItem.save();
      return res.status(201).json(lostItem);
    } catch (error) {
      return res.status(500).json({
        message: 'Could not create a new loss',
        error,
      });
    }
  }

  async updateLostItems(req, res) {
    try {
      const updateLostItem = await Extravios.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updateLostItem) {
        return res.status(404).json({ message: 'Lost Item not found' });
      }
      return res.status(200).json(updateLostItem);
    } catch (error) {
      return res.status(500).json({
        message: 'The loss could not be updated',
        error,
      });
    }
  }

  async deleteLostItems(req, res) {
    try {
      const deletedLostItem = await Extravios.findByIdAndUpdate(req.params.id, { solved: true });
      if (!deletedLostItem) {
        return res.status(404).json({ message: 'Lost Item not found' });
      }
      return res.status(204).json({
        mesagge: 'User deleted successfully'
      });
    } catch (error) {
      return res.status(400).json({
        mesagge: 'The loss could not be erased',
        error,
      });
    }
  }
}

module.exports = new lostItemsController();
