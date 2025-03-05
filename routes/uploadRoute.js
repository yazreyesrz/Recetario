const express = require("express");
const router = express.Router();
const cloudinary = require("../config/cloudinary");
const multer = require("multer");

// Configurar multer para manejar archivos
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Endpoint para subir imágenes
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No se envió ninguna imagen" });
    }

    const result = await cloudinary.uploader.upload_stream(
      { folder: "recetas" },
      (error, uploadResponse) => {
        if (error) {
          console.error("Error uploading image:", error);
          return res.status(500).json({ msg: "Error al subir la imagen" });
        }
        res.json({ url: uploadResponse.secure_url });
      }
    );

    result.end(req.file.buffer);
  } catch (err) {
    console.error("Error uploading image:", err);
    res.status(500).json({ msg: "Error al subir la imagen" });
  }
});

module.exports = router;
