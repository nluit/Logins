const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
// Dashboard
router.get('/index', ensureAuthenticated, (req, res) =>
    res.render('Admin/index', { title: "Admin" })
);
router.get('/profile', (req, res) =>
    res.render('Admin/profile', { title: "profile" })
);
module.exports = router;