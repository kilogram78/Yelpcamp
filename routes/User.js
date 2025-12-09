const express = require('express');
const router = express.Router();
const CatchAsync = require('../Utils/CatchAsync');
const passport = require('passport');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(CatchAsync(users.register));

router.route('/login')
    .get(users.login)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.renderLogin);

router.get('/logout', users.logout);


module.exports = router;