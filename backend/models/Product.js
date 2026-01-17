const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  quantity: Number,
  minStock: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model("Product", productSchema);
