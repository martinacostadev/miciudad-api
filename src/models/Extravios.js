const mongoose = require('mongoose');

const ExtraviosSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The name is required'],
      maxlength: [40, 'Name must be less than 40 characters '],
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
    solved: {
      type: Boolean
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lostItems = mongoose.model('Extravios', ExtraviosSchema);
module.exports = lostItems;
