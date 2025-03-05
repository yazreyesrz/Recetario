const mongoose = require("mongoose");

const PreferenceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Nombre de la preferencia
});

module.exports = mongoose.model("Preference", PreferenceSchema);
