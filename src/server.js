/**
 * Common JS => usa o require (hoje em dia quase não é usado) ; 
 * ESModules => import/export (mais usado, porém o node não suporta por padrão, 
 * precisando adicionar no package.json o type = module) 
 */
//const http = require('http')
// "node:" para diferenciar entre módulo interno e de terceiros
import http from 'node:http' 

// GET, POST, PUT, PATCH, DELETE

//GET => buscar recurso do back-end
//POST => criar uma informação no back-end
//PUT => atualizar um recurso no back-end
//PATCH => atualizar uma informação específica de um recurso no back-end
//DELETE => remover um recurso do back-end

// JSON - JavaScript Object Notation

// Cabeçalhos (requisição/resposta) -> Metadados

const users = []

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/users') {
    //early return
    return res
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    })

    return res.end('Criação de usuário')
  }

  return res.end('Hello word')
})

server.listen(3333)



