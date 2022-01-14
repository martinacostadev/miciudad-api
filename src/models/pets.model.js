const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'The title is required'],
      maxlength: [40, 'Title must be less than 40 characters'],
    },
    breed: {
      type: String,
      required: [true, 'The breed of pet is required'],
      maxlength: [20, 'Breed must be less than 20 characters']
    },
    description: {
      type: String,
      required: [true, 'The description are required'],
      maxlength: [180, 'Title must be less than 40 characters']
    },
    city: {
      type: String,
      required: [true, 'The city is required'],
    },
    province: {
      type: String,
      required: [true, 'The province is required'],
    },
    country: {
      type: String,
      required: [true, 'The country is required'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    solved: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lostPets = mongoose.model('lost_pets', petsSchema);
module.exports = lostPets;
