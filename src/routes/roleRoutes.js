const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

router.post('/', roleController.createRole);
router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRole);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);

router.post('/roles/:roleId', roleController.addProgramsToRole);

module.exports = router;