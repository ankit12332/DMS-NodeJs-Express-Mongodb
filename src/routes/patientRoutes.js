const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Module routes
router.post('/', patientController.createPatient);
router.get('/:id', patientController.getPatient);
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);
router.get('/', patientController.getAllPatients);

module.exports = router;