const express = require('express');
const path = require('path');

const router = express.Router();
const rootDir = require('../util/path');

const users = require('./createuser').users

router.get('/', (req, res, next) => {
    res.render('users', {
        pageTitle: 'Users',
        users: users})
})


exports.routes = router;