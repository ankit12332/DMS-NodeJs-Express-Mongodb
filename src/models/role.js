const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    roleName: {
      type: String,
      required: true
    },
    programs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program'
    }]
  });
  
  module.exports = mongoose.model('Role', roleSchema);