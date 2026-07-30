const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

// @desc    Register a new user
// @route   POST /register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
    console.log("User registered:", username);
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// @desc    Login user
// @route   POST /login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "User not found. Please register." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
    console.log("User logged in:", username);
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// @desc    Verify token
// @route   POST /verifyToken
// @access  Public
const verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ valid: false, message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ valid: false, message: 'Invalid or expired token' });
    }
    res.json({ valid: true, username: decoded.username });
  });
};

module.exports = {
  registerUser,
  loginUser,
  verifyToken,
};
