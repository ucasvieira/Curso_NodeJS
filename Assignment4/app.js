const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const createuserRoutes = require('./routes/createuser');
const usersRoutes= require('./routes/users').routes

app.use(bodyParser.urlencoded({extended: false}));

app.use('/', createuserRoutes.routes)
app.use('/users', usersRoutes)

app.listen(3000)

module.exports = path.dirname(require.main.filename);