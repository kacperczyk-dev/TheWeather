const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../db/models/user');

// Start defining routes for /auth
router.get('/login', (req, res, next) => {
    res.send('/login');
});

router.post('/register', (req, res, next) => {
    var securedPassword;
    var user;

    bcrypt.genSalt(10).then((salt) => {
        bcrypt.hash(req.body.password, salt).then((hash) => {
            user = new User({
                fullName: req.body.fullName,
                email: req.body.email,
                password: hash,
                salt: salt
            });
            user.save().then((doc) => {
                res.status(200).send({
                    message: `${doc.email} succesfully registered!`
                });
            });
        });
    }).catch((err) => {
        // Error handling for genSalt
    });  
});

module.exports = router;