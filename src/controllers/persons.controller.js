const Persons = require('../models/persons.models');

class personsController {
  async createLostPerson(req, res) {
    try {
      const { state, user, ...body } = req.body;

      const personDB = await Persons.findOne({
        firstName: body.firstName,
        lastName: body.lastName,
        title: body.title,
        description: body.description,
      });

      if (personDB) {
        return res.status(400).json({
          message: `The item ${personDB.title}, already exist`,
        });
      }

      const data = {
        ...body,
        title: body.title.toUpperCase(),
        user: req.params.id,
      };

      const person = new Persons(data);

      await person.save();

      res.status(201).json({
        message: 'Lost Person created successfully',
        person,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async getLostPerson(req, res) {
    try {
      const person = await Persons.findById(req.params.id).populate('category');

      res.json(person);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getAllLostPersons(req, res) {
    try {
      const { limit = 5, from = 0 } = req.query;
      const query = { state: true };

      const [total, persons] = await Promise.all([
        Persons.countDocuments(query),
        Persons.find(query)

          .skip(Number(from))
          .limit(Number(limit))
          .populate('category'),
      ]);

      res.json({
        total,
        persons,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async updateLostPerson(req, res) {
    try {
      const { id } = req.params;
      const { state, user, ...data } = req.body;

      if (data.name) {
        data.name = data.name.toUpperCase();
      }

      const person = await Persons.findByIdAndUpdate(id, data, { new: true });

      res.status(200).json({
        message: 'Lost Person updated successfully',
        person,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async deleteLostPerson(req, res) {
    try {
      const { id } = req.params;
      const person = await Persons.findByIdAndUpdate(
        id,
        { state: false },
        { new: true }
      );

      res.status(200).json({
        message: 'Lost Person deleted successfully',
        person,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new personsController();
