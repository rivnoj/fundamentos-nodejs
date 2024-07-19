/**
 * Common JS => usa o require (hoje em dia quase não é usado) ; 
 * ESModules => import/export (mais usado, porém o node não suporta por padrão, 
 * precisando adicionar no package.json o type = module) 
 */
//const http = require('http')
// "node:" para diferenciar entre módulo interno e de terceiros
import http from 'node:http' 
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

// GET, POST, PUT, PATCH, DELETE

//GET => buscar recurso do back-end
//POST => criar uma informação no back-end
//PUT => atualizar um recurso no back-end
//PATCH => atualizar uma informação específica de um recurso no back-end
//DELETE => remover um recurso do back-end

// JSON - JavaScript Object Notation

// Cabeçalhos (requisição/resposta) -> Metadados

// HTTP Status Code

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path === url
  })

  if (route) {
    return route.handler(req, res)
  }
  
  return res.writeHead(404).end()
})

server.listen(3333)



