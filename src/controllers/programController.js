const Program = require('../models/program');
const Module = require('../models/module');

// Create a new program
exports.createProgram = async (req, res) => {
  try {
    // Check if the module exists
    const module = await Module.findById(req.body.module);
    // if (!module) {
    //   return res.status(404).json({ error: "Module not found" });
    // }

    const newProgram = new Program({
      title: req.body.title,
      description: req.body.description,
      module: req.body.module,
      path:req.body.path
    });

    await newProgram.save();
    res.status(201).json(newProgram);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all programs
exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find({}).populate('module');
    res.json(programs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single program by ID
exports.getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id).populate('module');
    if (!program) {
      return res.status(404).json({ error: "Program not found" });
    }
    res.json(program);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a program by ID
exports.updateProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('module');
    if (!program) {
      return res.status(404).json({ error: "Program not found" });
    }
    res.json(program);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a program by ID
exports.deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) {
      return res.status(404).json({ error: "Program not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};