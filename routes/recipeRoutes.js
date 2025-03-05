const express = require("express");
const {
  createRecipe,
  getRecipes,
  getAllRecipes,
  deleteRecipe,
} = require("../controllers/recipeController");
const { auth, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createRecipe); // Crear receta (solo usuarios autenticados)
router.get("/", getRecipes); // Obtener recetas basadas en preferencias
router.get("/all", auth, admin, getAllRecipes); // Obtener todas las recetas (solo admin)
router.delete("/:id", auth, admin, deleteRecipe); // Eliminar receta (solo admin)

module.exports = router;
