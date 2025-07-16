const fs = require('fs');
const path = require('path');

fs.writeFileSync(path.join(__dirname, 'hello.txt'), 'Hello, World! This is my first app.');

console.log('Arquivo criado com sucesso!');