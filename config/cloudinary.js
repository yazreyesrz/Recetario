const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Usa la variable de entorno
  api_key: process.env.CLOUDINARY_API_KEY, // Usa la variable de entorno
  api_secret: process.env.CLOUDINARY_API_SECRET, // Usa la variable de entorno
});

module.exports = cloudinary;
