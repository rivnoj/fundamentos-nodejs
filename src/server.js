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

/**
 * Query parameters: exemplo, http://localhost:3333/users?userId=1 . 
 * Usados quando a URL é stateful, para enviar informações não sensíveis 
 * e não obrigatórios, que modificam a resposta, para filtragem.
 */

/**
 * Route parameters: exemplo, http://localhost:3333/users/1 .
 * Parâmetros não nomeados que aparecem na rota, no exemplo, o usuário com id = 1. 
 * Usados para identificação de recursos. O método HTTP indica a operação que 
 * deve ocorrer para o parâmetro. Não deve ser usado para enviar informações
 * sensíveis.
 */

/**
 * Request body: exemplo, http://localhost:3333/users . Envio  de informações de um 
 * formulário, em geral, via HTTPS.
 */

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    req.params = { ...routeParams.groups }

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)



