/* eslint-disable new-cap */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
const lostItems = require('./lostItems');

class lostItemsController {
  async getLostItems(req, res) {
    try {
      const myLostItems = await lostItems.find();
      return res.status(200).json(myLostItems);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async postLostItems(req, res) {
    try {
      const newLostItem = new lostItems(req.body);
      const lostItem = await newLostItem.save();
      return res.status(201).json(lostItem);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateLostItems(req, res) {
    try {
      const updateLostItem = await lostItems.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true, // valida nuevamente el esquema para evitar ingresar datos no validados
        }
      );
      if (!updateLostItem) {
        return res.status(404).json({ message: 'Lost Item not found' });
      }
      return res.status(200).json(updateLostItem);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteLostItems(req, res) {
    try {
      const deletedLostItem = await lostItems.findByIdAndDelete(req.params.id);
      if (!deletedLostItem) {
        return res.status(404).json({ message: 'Lost Item not found' });
      }
      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }
}

module.exports = new lostItemsController();
