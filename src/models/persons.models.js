const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personsSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'The first name is required'],
      maxlength: [40, 'First name must be less than 40 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'The last name is required'],
      maxlength: [40, 'Last name must be less than 40 characters'],
    },
    sex: {
      type: String,
      required: [true, 'The sex is required'],
      default: 'UNDEFINED',
      emun: ['FEMALE', 'MALE', 'OTHER'],
    },
    height: {
      type: String,
      required: [true, 'The height is required'],
    },
    weight: {
      type: String,
      required: [true, 'The weight is required'],
    },
    ethnicity: {
      type: String,
      required: [true, 'The ethnicity is required'],
    },
    description: {
      type: String,
      required: [true, 'The description are required'],
      maxlength: [180, 'Title must be less than 40 characters']
    },
    city: {
      type: String,
      required: [true, 'The city is required'],
      		default: 'USER_ROLE',
		emun: ['ADMIN_ROLE', 'USER_ROLE'],
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

const lostPersons = mongoose.model('lost_persons', personsSchema);
module.exports = lostPersons;
