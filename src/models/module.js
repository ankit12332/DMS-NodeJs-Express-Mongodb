// Module.js
const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  moduleName: {
    type: String,
    required: true
  }
  // No direct reference to Programs needed here
});

module.exports = mongoose.model('Module', moduleSchema);
