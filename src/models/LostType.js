const mongoose = require('mongoose');

const lostTypeSchema = new mongoose.Schema({
  name_type: {
    type: String,
    required: [true, 'name_type is required'],
    unique: true,
    trim: true,
    maxlength: [40, 'name_type must be less than 40 characters '],
  },
  description_type: {
    type: String,
    required: true,
    trim: true,
    maxlength: [40, 'description_type must be less than 40 characters '],
  },
});

const lostType = mongoose.model('lostType', lostTypeSchema);
module.exports = lostType;
