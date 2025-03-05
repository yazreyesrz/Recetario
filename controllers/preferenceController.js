const Preference = require("../models/Preference");

// Obtener todas las preferencias
exports.getPreferences = async (req, res) => {
  try {
    const preferences = await Preference.find();
    res.json(preferences);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Agregar una nueva preferencia (solo para administradores)
exports.addPreference = async (req, res) => {
  const { name } = req.body;
  try {
    let preference = await Preference.findOne({ name });
    if (preference)
      return res.status(400).json({ msg: "La preferencia ya existe" });

    preference = new Preference({ name });
    await preference.save();
    res.json(preference);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Eliminar una preferencia (solo para administradores)
exports.deletePreference = async (req, res) => {
  try {
    const preference = await Preference.findById(req.params.id);
    if (!preference)
      return res.status(404).json({ msg: "Preferencia no encontrada" });

    await preference.remove();
    res.json({ msg: "Preferencia eliminada" });
  } catch (err) {
    res.status(500).send("Server error");
  }
};
