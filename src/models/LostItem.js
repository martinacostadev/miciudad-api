const mongoose = require("mongoose");

const lostItemsSchema = new mongoose.Schema(
  {
    name_article: {
      type: String,
      required: [true, "name_article is required"],
      unique: true,
      trim: true,
      maxlength: [40, "name_article must be less than 40 characters "],
    },
    date_lost_article: {
      type: Date,
      required: true,
      trim: true,
      maxlength: [10, "Ddate_lost_article must be DATE up to 10 characters "],
    },
    lost_zone: {
      type: String,
      required: true,
      trim: true,
      maxlength: [40, "lost_zone must be less than 40 characters "],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const LostItem = mongoose.model("lost_items", lostItemsSchema);
module.exports = LostItem;
