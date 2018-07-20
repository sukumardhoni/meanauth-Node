const mongoose = require('mongoose');

//Schema definition
const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
});

//Creating data or model based on the Schema definition
module.exports = mongoose.model('Post', postSchema)