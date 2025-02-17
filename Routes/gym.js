const express = require('express');
const router = express.Router();
const GymController = require('../Controllers/gym');


router.post('/register',GymController.register);
router.post('/login',GymController.login);

module.exports = router;