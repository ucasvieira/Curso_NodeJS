const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const adminsRoutes = require('./routes/admins');
const usuariosRoutes = require('./routes/usuarios');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use(adminsRoutes);
app.use(usuariosRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
})

app.listen(3000);

module.exports = path.dirname(require.main.filename);