const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const preferenceRoutes = require("./routes/preferenceRoutes");
//const uploadRoutes = require("./routes/uploadRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/preferences", preferenceRoutes);
//app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
