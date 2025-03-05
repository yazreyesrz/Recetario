const Recipe = require("../models/Recipe");
const User = require("../models/User");
const admin = require("firebase-admin");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");

// Crear receta
exports.createRecipe = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ msg: "Error al procesar la imagen" });
    }

    const { title, ingredients, steps, categories, preferences } = req.body;
    let imageUrl = "";

    try {
      // Si hay una imagen, subirla a Cloudinary
      if (req.file) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "recetas" },
            (error, uploadResponse) => {
              if (error) reject(error);
              else resolve(uploadResponse);
            }
          );
          stream.end(req.file.buffer);
        });
        imageUrl = result.secure_url;
      }

      const recipe = new Recipe({
        title,
        ingredients,
        steps,
        image: imageUrl, // Se guarda la URL de la imagen en la receta
        categories,
        preferences,
        createdBy: req.user.id,
      });
      await recipe.save();

      // Notificar a los usuarios con las mismas preferencias
      const usersToNotify = await User.find({
        preferences: { $in: preferences },
      });
      const fcmTokens = usersToNotify
        .map((user) => user.fcmToken)
        .filter((token) => token);

      if (fcmTokens.length > 0) {
        const message = {
          notification: {
            title: "Nueva Receta",
            body: `Se ha publicado una nueva receta en ${categories.join(
              ", "
            )}`,
            image: imageUrl, // Se usa la imagen en la notificación
          },
          tokens: fcmTokens,
        };

        admin
          .messaging()
          .sendMulticast(message)
          .then((response) => console.log("Notificaciones enviadas:", response))
          .catch((error) =>
            console.error("Error enviando notificaciones:", error)
          );
      }

      res.json(recipe);
    } catch (error) {
      console.error("Error al crear receta:", error);
      res.status(500).send("Server error", error);
    }
  });
};

// Obtener recetas basadas en preferencias
exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.error("Error al obtener recetas:", error);
    res.status(500).send("Server error");
  }
};

//  Obtener todas las recetas (solo admin)
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.error("Error al obtener todas las recetas:", error);
    res.status(500).send("Server error");
  }
};

// Eliminar receta (solo admin)
exports.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    await Recipe.findByIdAndDelete(id);
    res.json({ msg: "Receta eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar receta:", error);
    res.status(500).send("Server error");
  }
};
