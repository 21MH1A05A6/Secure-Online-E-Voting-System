const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Function to generate a unique voter ID
exports.generateVoterId = async () => {
  let voterId;
  let exists;
  
  // Lazy-load the User model to avoid circular dependency
  const User = require("../models/User");

  do {
    const randomNumbers = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
    voterId = `VOTE${randomNumbers}`; // Format: VOTE123456

    // Check if this voter ID already exists in the database
    exists = await User.findOne({ voterId });
  } while (exists); // Keep generating until we get a unique voter ID

  return voterId;
};

const UserSchema = new mongoose.Schema(
  {
    voterId: { type: String, unique: true }, // Removed `default: id`
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tempPassword: { type: String, default: null },
    tempPasswordExpiry: { type: Date, default: null },
  },
  { timestamps: true }
);

// ✅ Generate a unique voter ID before saving
UserSchema.pre("save", async function (next) {
  if (!this.voterId) {
    this.voterId = await generateVoterId();
  }

  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// **Compare password method**
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// **Generate JWT Token**
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};

module.exports = mongoose.model("User", UserSchema);
