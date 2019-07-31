const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');
var loginController = require("../controllers/loginController");
// Login Page
router.get('/login', function(req, res) {
    res.render('Login/login', { title: "Login" })
});

// Register Page
router.get('/register', forwardAuthenticated, loginController.register);

// Register
router.post('/register', loginController.Registers);

// Login
router.post('/login', loginController.Logins);

// Logout
router.get('/logout', loginController.logout);

module.exports = router;