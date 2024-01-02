// Module.js
const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  moduleName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Module', moduleSchema);
