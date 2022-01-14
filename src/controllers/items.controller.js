const Items = require('../models/items.model');

class petsController {
  async createLostItem(req, res) {
    try {
      const { state, user, ...body } = req.body;

      const itemDB = await Items.findOne({ title: body.title });

      if (itemDB) {
        return res.status(400).json({
          message: `The item ${itemDB.title}, already exist`,
        });
      }

      const data = {
        ...body,
        title: body.title.toUpperCase(),
        user: req.params.id,
      };

      const item = new Items(data);

      await item.save();

      res.status(201).json({
        message: 'Lost Item created successfully',
        item,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async getLostItem(req, res) {
    try {
      const item = await Items.findById(req.params.id)
       .populate('category')

      res.json(item);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getAllLostItems(req, res) {
    try {
      const { limit = 5, from = 0 } = req.query;
      const query = { state: true };

      const [total, items] = await Promise.all([
        Items.countDocuments(query),
        Items.find(query)

          .skip(Number(from))
          .limit(Number(limit))
          .populate('category')
      ]);

      res.json({
        total,
        items,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async updateLostItem(req, res) {
    try {
      const { id } = req.params;
      const { state, user, ...data } = req.body;

      if (data.name) {
        data.name = data.name.toUpperCase();
      }

      const item = await Items.findByIdAndUpdate(id, data, { new: true });

      res.status(200).json({
        message: 'Lost Item updated successfully',
        item,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async deleteLostItem(req, res) {
    try {
      const { id } = req.params;
      const item = await Items.findByIdAndUpdate(
        id,
        { state: false },
        { new: true }
      );

      res.status(200).json({
        message: 'Lost Item deleted successfully',
        item,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new petsController();
