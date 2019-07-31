// reuire module
const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');


//exports module

//get login
module.exports.login = function(req, res) {
        res.render('Login/login', { title: "Login" })
    }
    //get register
module.exports.register = function(req, res) {
        res.render('Login/register', { title: "Register" })
    }
    //post login
module.exports.Logins = function(req, res, next) {
        {
            passport.authenticate('local', {
                successRedirect: '/index',
                failureRedirect: '/Login',
            })(req, res, next);
        }
    }
    // get logout
module.exports.logout = function(req, res) {
        {
            req.logout();
            res.redirect('/login');
        }
    }
    // post Register
module.exports.Registers = function(req, res) {
    {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => {

                        res.redirect('/login');
                    })
                    .catch(err => console.log(err));
            });
        });

    }
}