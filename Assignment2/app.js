const express = require('express');
const http = require('http');

const app = express();

app.use((req,res,next) => {
    console.log('Acessou o middleware 1');
    next();
})

app.use('/users', (req,res,next) => {
    console.log('Acessou users');
    res.send('<h1>Página de Usuários</h1>');
})

app.use('/', (req,res,next) => {
    console.log('Acessou página principal');	
    res.send('<h1>Página Principal boa</h1>');
})

app.listen(3000)