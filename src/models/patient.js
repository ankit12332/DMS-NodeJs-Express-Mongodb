const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other'] // or use a more inclusive list of genders
  },
  contactNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String
  },
  medicalHistory: {
    type: String // or an array or object if more structure is needed
  },
  currentMedications: [String], // array of medication names
  emergencyContact: {
    name: String,
    relationship: String,
    contactNumber: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  documents: [{
    name: String,
    filePath: String
}]
});

module.exports = mongoose.model('Patient', patientSchema);
