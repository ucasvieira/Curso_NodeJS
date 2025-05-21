const express = require('express');
const path = require('path');

const router = express.Router();

const rootDir = require('../util/path');

// /admin/add-product => GET
router.get('/admins',(req,res,next) => {
    res.sendFile(path.join(rootDir,'views','admins.html'));
});


module.exports = router;