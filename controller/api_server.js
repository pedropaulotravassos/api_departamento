var api_log = require('./api_log').log
var api_controller = require('./api_controller')
var restify = require('restify')
const corsMiddleware = require('restify-cors-middleware')
const cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: ['*']
})


// CONFIG AXIOS GLOBALMENTE
const https = require('https')
const axios = require('axios')
axios.interceptors.request.use(function (config) {
    config.httpsAgent = new https.Agent({ rejectUnauthorized: false })
    return config;
});

var server = restify.createServer()

server.pre(cors.preflight)
server.use(cors.actual)
server.use(api_log)
server.use(restify.plugins.fullResponse())
server.use(restify.plugins.bodyParser())

server.post('/salvar', api_controller.salvaDepartamento)
server.get('/listar/:cod', api_controller.listaDeptoPorCod)
server.get('/listar', api_controller.listaDepartamentos)

exports.server = server