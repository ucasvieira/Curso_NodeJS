const express = require('express');
const path = require('path');

const router = express.Router();
const rootDir = require('../util/path');
const users = [];

router.get('/', (req, res, next) => {
    res.render('createuser', {
        pageTitle: 'Create User'})
})

router.post('/', (req, res, next) => {
    users.push({name: req.body.name, age: req.body.age});
    res.redirect('/users');
})


exports.routes = router;
exports.users = users;