// declare express router
const express = require('express');
const router = express.Router();

const userController = require('./controller');

// declare routes to create, read, update and delete user
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// export routes
module.exports = router;