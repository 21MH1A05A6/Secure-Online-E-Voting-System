const User = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1️⃣ Check in the Admin collection first
    let user = await Admin.findOne({ email });
    let role = "admin"; // Default role if found in Admin collection

    // 2️⃣ If not found in Admin, check in Users collection
    if (!user) {
      user = await User.findOne({ email });
      role = "user"; // Set role to "user" if found in Users collection
    }

    // 3️⃣ If user not found in both collections
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 4️⃣ Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 5️⃣ Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role }, // Include role in the token
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role }); // Send token and role to frontend
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
