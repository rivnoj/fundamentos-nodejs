/**
 * Common JS => usa o require (hoje em dia quase não é usado) ; 
 * ESModules => import/export (mais usado, porém o node não suporta por padrão, 
 * precisando adicionar no package.json o type = module) 
 */
//const http = require('http')
// "node:" para diferenciar entre módulo interno e de terceiros
import http from 'node:http' 
import { json } from './middlewares/json.js'
import { Database } from './database.js'

// GET, POST, PUT, PATCH, DELETE

//GET => buscar recurso do back-end
//POST => criar uma informação no back-end
//PUT => atualizar um recurso no back-end
//PATCH => atualizar uma informação específica de um recurso no back-end
//DELETE => remover um recurso do back-end

// JSON - JavaScript Object Notation

// Cabeçalhos (requisição/resposta) -> Metadados

// HTTP Status Code

const database = new Database()

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  if (method === 'GET' && url === '/users') {
    const users = database.select('users')
    
    //early return
    return res.end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    const user = {
      id: 1,
      name,
      email,
    }

    database.insert('users', user)

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)



