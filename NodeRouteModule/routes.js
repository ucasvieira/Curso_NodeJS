const fs = require('fs')

const requestHandler = (req,res) =>{
    const url = req.url
    const method = req.method
    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>Enviar mensagem</title><head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></input></form></body>')
        res.write('</html>')
        return res.end() //Não pode terminar a resposta com .end() e depois tentar adicionar algo a ela, por isso usa o return para encerrar a função
    }
    if (url === '/message' && method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')[1]
            console.log(message)
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })
        })
    }
    // console.log(req.url, req.method, req.headers) // Printa as informações do request(a  url, o metodo, e o header)
    // process.exit(); // Para o servidor
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>My first Page</title><head>')
    res.write('<body><h1>Primeiro Servidor Node JS</h1></body>')
    res.write('</html>')
    res.end()
}

// module.exports = {
//     handler: requestHandler,
//     texto: 'texto boa beleza'
// }

// module.exports = requestHandler

// module.exports.handler = requestHandler
// module.exports.text = 'texto boa beleza'

exports.handler = requestHandler
exports.text = 'texto boa teste'