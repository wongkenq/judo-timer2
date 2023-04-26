const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/users/getUser/:id', usersController.getUser);
router.post('/users/createUser', usersController.createUser);

module.exports = router;
