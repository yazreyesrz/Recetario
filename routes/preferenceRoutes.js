const express = require("express");
const {
  getPreferences,
  addPreference,
  deletePreference,
} = require("../controllers/preferenceController");
const { auth, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getPreferences); // Obtener todas las preferencias
router.post("/", auth, admin, addPreference); // Agregar preferencia (solo admin)
router.delete("/:id", auth, admin, deletePreference); // Eliminar preferencia (solo admin)

module.exports = router;
