const Lost_Items = require("../models/LostItem");

exports.getLostItems = async (req, res) => {
  try {
    const lostItems = await Lost_Items.find();
    return res.status(200).json(lostItems);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  return;
};
