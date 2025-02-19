const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tempPassword: { type: String, default: null }, 
  tempPasswordExpiry: { type: Date, default: null },
});

module.exports = mongoose.model("User", UserSchema);

