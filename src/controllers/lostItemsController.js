const Lost_Items = require("../models/LostItem");

exports.getLostItems = async (req, res) => {
  try {
    const lostItems = await Lost_Items.find();
    return res.status(200).json(lostItems);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.postLostItem = async (req, res) => {
  try {
    const newLostItem = new Lost_Items(req.body);
    const lostItem = await newLostItem.save();
    return res.status(201).json(lostItem);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateLostItem = async (req, res) => {
  try {
    const updateLostItem = await Lost_Items.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true, //valida nuevamente el esquema para evitar ingresar datos no validados
      }
    );
    // console.log(req.params.id, req.body )
    if (!updateLostItem)
      return res.status(404).json({ message: "Lost Item not found" });
    return res.status(200).json(updateLostItem);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteLostItem = async (req, res) => {
  try {
    const deletedLostItem = await Lost_Items.findByIdAndDelete(req.params.id);
    if (!deletedLostItem)
      return res.status(404).json({ message: "Lost Item not found" });
    return res.status(204).json();
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};
