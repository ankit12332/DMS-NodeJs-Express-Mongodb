const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

// Create a new user
router.post('/', userController.createUser);

// Get a single user by id
router.get('/:id', userController.getUser);

// Update a user by id
router.put('/:id', userController.updateUser);

// Delete a user by id
router.delete('/:id', userController.deleteUser);

// List all users (protected route)
router.get('/', authenticate, userController.listUsers); // Apply authenticate middleware here

// Assign roles to a user
router.post('/:userId/roles', userController.addRolesToUser);

module.exports = router;
