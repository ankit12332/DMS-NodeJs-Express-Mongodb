const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    // Hash password before saving to database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      createdAt: req.body.createdAt
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read (get) a single user by id
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
};

// Update a user by id
exports.updateUser = async (req, res) => {
  try {
    // If password is being updated, it needs to be hashed
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a user by id
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
};

// List all users
exports.listUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
