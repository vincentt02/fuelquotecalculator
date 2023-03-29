const express = require('express');
const router = express.Router();

const AuthController = require ('../controllers/AuthController')

router.use(express.json());

router.post('/', AuthController.validate, AuthController.register)

module.exports = router;
