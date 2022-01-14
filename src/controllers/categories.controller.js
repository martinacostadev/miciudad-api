const Category = require('../models/category.model');

class categoriesController {
  async createCategory(req, res) {
    try {
      const name = req.body.name.toUpperCase();

      const categoryDB = await Category.findOne({ name });

      if (categoryDB) {
        return res.status(400).json({
          msg: `The category ${categoryDB.name}, already exist`,
        });
      }

      // const data = {
      //   name,
      //   // user: req.user._id,
      // };

      const category = new Category({ name });
      await category.save();

      res.status(201).json(category);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async getCategory(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findById(id).populate("name");

      res.json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAllCategories(req, res) {
    try {
      const { limit = 5, from = 0 } = req.query;
      const query = { state: true };

      const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
          .populate("nickname")
          .skip(Number(from))
          .limit(Number(limit)),
      ]);

      return res.json({
        total,
        categories,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { state, user, ...data } = req.body;

      data.name = data.name.toUpperCase();
      data.user = req.user._id;

      const category = await Category.findByIdAndUpdate(id, data, {
        new: true,
      });

      return res.json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const deletedCategory = await Category.findByIdAndUpdate(
        id,
        { state: false },
        { new: true }
      );

      return res.json(deletedCategory);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new categoriesController();