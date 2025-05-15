const fs = require('fs')

const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method
    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>My first Page</title><head>')
        res.write('<body><form action="/create-user" method="POST"><label>Username<input type="text" name="username"><button type="submit">Enviar</button></input></label></form><a href="/users"><button>Ver usuarios</button></a></body>')
        res.write('</html>')
        return res.end()
    } 
    if (url === '/users') {
        fs.readFile('Users.txt', (err, data) => {
            if (err) {
                console.log(err)
                return res.end()
            }
            const users = data.toString().split('\n').map(user => `<li>${user}</li>`).join('')
            res.write('<html>')
            res.write('<head><title>Users</title><head>')
            res.write('<body><ul>' + users + '</ul></body>')
            res.write('</html>')
            return res.end()
        })
    }
    if (url === '/create-user' && method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            body.push(chunk)
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const username = parsedBody.split('=')[1]
            console.log(username)
            fs.appendFile('Users.txt', username+'\n', (err) => {
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })
        })
    }
}

exports.handler = requestHandler