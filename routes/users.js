const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken')
const config = require("../config/databse")
const User = require('../models/user');

//Register
router.post('/register', (req, res) => {
    console.log(JSON.stringify(req.body))
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });
    console.log(JSON.stringify(User))
    console.log(JSON.stringify(newUser))


    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ 'success': false, 'msg': 'Failed to register user' })
        } else {
            res.json({ 'success': true, 'msg': 'user registered' })
        }
    })
    // res.send('Register')
    // console.log('register')
})

//Authenticate
router.post('/authenticate', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    console.log(JSON.stringify(req.body))
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, msg: 'User not found' });
        }
        console.log('user' + JSON.stringify(user))
        console.log('err ' + JSON.stringify(err))
        if (user) {
            User.comparePassword(password, user.password, (err, isMatch) => {
                console.log('err' + err)
                console.log('isMatch' + isMatch)
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 604800 //1 week
                    })
                    console.log('token' + token)

                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        user: {
                            id: user._id,
                            username: user.username,
                            name: user.name,
                            email: user.email
                        }
                    });
                } else {
                    res.json({ success: false, msg: 'Wrong Password' });
                }
            })
        }
    })
})

//Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ user: req.user })
    console.log('Profile')
})

module.exports = router;