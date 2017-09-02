const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../db/models/user');
const _ = require('lodash');
var { authenticate } = require('../middleware/authenticate');

// Routes for /auth

router.post('/login', (req, res, next) => {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

router.post('/register', (req, res, next) => {
    var body = _.pick(req.body, ['fullName', 'email', 'password']);
    var user = new User(body);
    user.save().then((user) => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});  

router.delete('/logout', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send('Logout succesful');
    }, (err) => {
        res.status(400).send('Logout was not possible');
    });
});

router.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

module.exports = router;