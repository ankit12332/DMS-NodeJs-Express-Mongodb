const Patient = require('../models/patient'); // Replace with the correct path to your Patient model

// Create a new patient
exports.createPatient = async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.status(201).send(newPatient);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get a single patient by ID
exports.getPatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).send();
        }
        res.send(patient);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a patient by ID
exports.updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!patient) {
            return res.status(404).send();
        }
        res.send(patient);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a patient by ID
exports.deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).send();
        }
        res.send(patient);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get all patients
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find({});
        res.send(patients);
    } catch (error) {
        res.status(500).send(error);
    }
};
