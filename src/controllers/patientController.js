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

//Upload documents to a patient
exports.uploadDocuments = async (req, res) => {
    try {
      const patientId = req.body.patientId; // Assuming patient's ID is passed in the request body
      const files = req.files; // Array of files
  
      // Create an array of document objects for updating the patient document
      const documentUpdates = files.map(file => ({
        name: file.filename,
        filePath: file.path
      }));
  
      // Update patient's documents
      await Patient.findByIdAndUpdate(patientId, {
        $push: { documents: { $each: documentUpdates } }
      });
  
      res.status(200).send({ message: 'Documents uploaded successfully', files: files });
    } catch (error) {
      res.status(500).send({ message: 'Error uploading documents', error: error });
    }
  };
