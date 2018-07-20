const express = require('express');
const router = express.Router();
const Post = require('../models/post');

//get Post's Api
router.get('/posts', (req, res) => {

    Post.find()
        .then(documents => {
            console.log(documents)
            res.json({
                message: 'post Fetched sucessfully',
                posts: documents
            })
        })
})

//saving Post's Api
router.post('/posts', (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    post.save();

    res.status(201).json({
        message: 'post added sucessfully'
    })
})

module.exports = router;