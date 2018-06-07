const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
//const config = require("./config/databse")

//User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, cb) {
    User.findById(id, cb)
}

module.exports.getUserByUsername = function (username, cb) {
    console.log(username)
    const query = { username: username }
    User.findOne(query, cb)
}

module.exports.getUserByEmail = function (email, cb) {
    console.log(email)
    const query = { email: email }
    User.findOne(query, cb)
}

module.exports.addUser = function (newUserObj, cb) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUserObj.password, salt, (err, hash) => {
            if (err) throw err;
            newUserObj.password = hash;
            newUserObj.save(cb)
        })
    })
}

module.exports.comparePassword = function (candidatePwd, hash, cb) {
    bcrypt.compare(candidatePwd, hash, (err, isMatch) => {
        if (err) throw err;
        cb(null, isMatch)
    })
}