const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  steps: { type: [String], required: true },
  image: { type: String }, //imagen de cloudlinary
  preferences: { type: [String], required: true }, // Preferencias asociadas a la receta
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Usuario que creó la receta
});

module.exports = mongoose.model("Recipe", RecipeSchema);
