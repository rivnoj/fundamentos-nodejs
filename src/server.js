/**
 * Common JS => usa o require (hoje em dia quase não é usado) ; 
 * ESModules => import/export (mais usado, porém o node não suporta por padrão, 
 * precisando adicionar no package.json o type = module) 
 */
//const http = require('http')
// "node:" para diferenciar entre módulo interno e de terceiros
import http from 'node:http' 

const server = http.createServer((req, res) => {
  return res.end('Hello word')
})

server.listen(3333)



