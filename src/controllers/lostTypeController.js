/* eslint-disable new-cap */
/* eslint-disable class-methods-use-this */
const lostType = require('../models/LostType');

class lostTypeController {
  async getLostType(req, res) {
    try {
      const myLostType = await lostType.find();
      return res.status(200).json(myLostType);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async postLostType(req, res) {
    try {
      const newLostType = new lostType(req.body);
      const saveLostType = await newLostType.save();
      return res.status(201).json(saveLostType);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateLostType(req, res) {
    try {
      const updateLostType = await lostType.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );
      if (!updateLostType) {
        return res.status(404).json({ message: 'Lost type not found' });
      }
      return res.status(200).json(updateLostType);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteLostType(req, res) {
    try {
      const deletedLostType = await lostType.findByIdAndDelete(req.params.id);
      if (!deletedLostType) {
        return res.status(404).json({ message: 'Lost type not found' });
      }
      return res.status(204).json({ message: `Lost type ${deletedLostType.name_type} deleted` });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }
}

module.exports = new lostTypeController();
