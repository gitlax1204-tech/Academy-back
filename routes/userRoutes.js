const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyToken } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verifyToken', verifyToken);

module.exports = router;
