var express = require('express');
var router = express.Router();
var passport = require("passport");

/* GET home page. */

router.get('/auth/facebook',
    passport.authenticate('facebook', { scope: "email" }),
    function(req, res) {

    });

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/index',
        failureRedirect: '/login'
    }),
    function(req, res) {
        res.redirect('/index');
    });

module.exports = router;