const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const upload = require('../middleware/upload');

// Module routes
router.post('/', patientController.createPatient);
router.get('/:id', patientController.getPatient);
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);
router.get('/', patientController.getAllPatients);

//Upload Documents to Patient
router.post('/uploadDocument', upload, patientController.uploadDocuments);

module.exports = router;