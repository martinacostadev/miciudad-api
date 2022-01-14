const Pets = require('../models/pets.model');

class petsController {
  async createLostPet(req, res) {
    try {
      const { state, user, ...body } = req.body;

      const petDB = await Pets.findOne({ title: body.title });

      if (petDB) {
        return res.status(400).json({
          message: `The item ${petDB.title}, already exist`,
        });
      }

      const data = {
        ...body,
        title: body.title.toUpperCase(),
        user: req.params.id,
      };

      const pet = new Pets(data);

      await pet.save();

      res.status(201).json({
        message: 'Lost Pet created successfully',
        pet,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async getLostPet(req, res) {
    try {
      const pet = await Pets.findById(req.params.id)
        .populate('category');

      res.json(pet);
    } catch (error) {
        console.log(error)
      return res.status(500).json(error);
    }
  }

  async getAllLostPets(req, res) {
    try {
      const { limit = 5, from = 0 } = req.query;
      const query = { state: true };

      const [total, pets] = await Promise.all([
        Pets.countDocuments(query),
        Pets.find(query)

          .skip(Number(from))
          .limit(Number(limit))
          .populate('category'),
      ]);

      res.json({
        total,
        pets,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async updateLostPet(req, res) {
    try {
      const { id } = req.params;
      const { state, user, ...data } = req.body;

      if (data.name) {
        data.name = data.name.toUpperCase();
      }

      const pet = await Pets.findByIdAndUpdate(id, data, { new: true });

      res.status(200).json({
        message: 'Lost Pet updated successfully',
        pet,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async deleteLostPet(req, res) {
    try {
      const { id } = req.params;
      const pet = await Pets.findByIdAndUpdate(
        id,
        { state: false },
        { new: true }
      );

      res.status(200).json({
        message: 'Lost Pet deleted successfully',
        pet,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new petsController();
