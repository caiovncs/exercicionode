// servidor http => objeto que recebe requisições http e retorna uma resposta 
const http = require('http')

// importação do simulador de banco de dados
const { todosDatabase } = require('./todoDb')

const server = http.createServer((request, response) => {
    //*** API TO-DOS ***/
    
    // GET /todos:id (trás um to-do especifico de acordo com o id)


    //GET /todos (retorna uma lista de to-do)

    //DELETE /todos:id (deleta um to-do especifico de acordo com o id)

    
    //PUT /todos:id (altera um to-do especifico de acordo com o id)
    if (request.method === 'PUT' && /^\/todos\/\d+$/.test(request.url)) {
        let bodyRaw = ''
        const [,, idRaw] = request.url.split('/')
        const id = parseInt(idRaw)
    
        request.on('data', data => bodyRaw += data)
    
        request.once('end', () => {
            const todo = { ...JSON.parse(bodyRaw), id }
    
        todosDatabase.update(todo)
        .then(updated => {
            response.writeHead(200, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify(updated))
        })
        })
        return
    }

    //POST /todos (insere um novo to-do)
    if(request.method === 'POST' && request.url.startsWith('/todos')) {
        let bodyRaw = ''

        request.on('data', data => bodyRaw += data)

        request.once('end', () => {
            const todo = JSON.parse(bodyRaw);

            todosDatabase.insert(todo)
            .then(inserted => {
                response.writeHead(201, { 'Content-Type': 'application/json' })
                response.end(JSON.stringify(inserted))
            })
        })
        return
    }

    response.writeHead(404)
    response.end("resource not found")
}) 


// porta TCP onnde escuta as requisições
server.listen(3000, '0.0.0.0', () => {
    console.log('server started')
})
