const express = require('express');

const employeeController = require('../controllers/employeeController');

const router = express.Router();

router.post('/',employeeController.signUp);

router.post('/login',employeeController.login);

router.post('/verifyToken',employeeController.verifyToken);

module.exports = router;