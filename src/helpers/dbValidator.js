const User = require("../models/user.model");
const Items = require('../models/items.model');
const Pets = require('../models/pets.model');
const Persons = require('../models/persons.models');
const Category = require('../models/category.model');
const Role = require('../models/role.model');

const validEmail = async (email = "") => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error(`This email: ${email} is already in use`);
  }
};

const validUserByID = async (id) => {
  const userExists = await User.findById(id);
  if (!userExists) {
    throw new Error(`This id: ${id} is already in use`);
  }
};

const existsCategoryById = async (id) => {
  const categoryExits = await Category.findById(id);
  if (!categoryExits) {
    throw new Error(`This id: ${id} is already in use`);
  }
};

const validRole = async (role = '') => {
	const roleExists = await Role.findOne({ role });
	if (!roleExists) {
		throw new Error(`This role: ${role} does not exist`);
	}
};

const existItemWithID = async (id) => {
  const thisIDExist = await Items.findById(id);
  
  if (!thisIDExist) {
    throw new Error(`Id does not exist ${id}`);
  }
};

const existPetWithID = async (id) => {
  const thisPetIDExist = await Pets.findById(id);
  
  if (!thisPetIDExist) {
    throw new Error(`Id does not exist ${id}`);
  }
};

const existPersonWithID = async (id) => {
  const thisPersonIDExist = await Persons.findById(id);
  
  if (!thisPersonIDExist) {
    throw new Error(`Id does not exist ${id}`);
  }
};

module.exports = {
  validEmail,
  validUserByID,
  existItemWithID,
  existPetWithID,
  existPersonWithID,
  existsCategoryById,
  validRole
};