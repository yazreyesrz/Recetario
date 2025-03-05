const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: { type: [String], default: [] }, // Preferencias del usuario
  role: { type: String, enum: ["user", "admin"], default: "user" }, // Rol del usuario
  fcmToken: { type: String }, // Token de FCM para notificaciones push
});

// Hash de la contraseña antes de guardar
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
