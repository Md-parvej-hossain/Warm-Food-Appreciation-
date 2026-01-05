const express = require('express');

const router = express.Router();

const { createJWT, logout } = require('../controllers/auth.controller');

router.post('/jwt', createJWT);
router.get('/logout', logout);

module.exports = router;
