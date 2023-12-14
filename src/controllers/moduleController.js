const Module = require('../models/module');

// Create a new module
exports.createModule = async (req, res) => {
  try {
    const module = new Module(req.body);
    await module.save();
    res.status(201).json(module);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all modules
exports.getAllModules = async (req, res) => {
  try {
    const modules = await Module.find({});
    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single module by ID
exports.getModuleById = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    res.json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a module by ID
exports.updateModule = async (req, res) => {
  try {
    const module = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    res.json(module);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a module by ID
exports.deleteModule = async (req, res) => {
  try {
    const module = await Module.findByIdAndDelete(req.params.id);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};