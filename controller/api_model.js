const axios = require('axios')
const queries = require('./api_cql.js')
const config = require('./api_config.js')
const { temValor, validaTamanho } = require('./api_validation.js')
const { executeCypherAsync } = config

exports.Departamento = {
     async salvar(payLoad) {
          const depto = buildDepto(payLoad)

          const cql = queries.cql.salvarDepartamento(depto)

          const result = await executeCypherAsync(cql)

          return result
     },
     async listar() {
          const cql = queries.cql.listarDepartamentos()

          const result = await executeCypherAsync(cql)

          return result
     },
     async listarPorCod(codigo) {
          validaTamanho('codigo', codigo, 4)
          const cql = queries.cql.listarDeptoPorCod(codigo)

          const result = await executeCypherAsync(cql)

          return result
     }
}

function buildDepto(payLoad) {
     if (!payLoad) throw { msg: 'playLoad sem valor algum', status: 404 }
     return {
          codigo: validaTamanho('codigoDpto', payLoad.codigo, 4),
          nome: temValor('nomeDpto', payLoad.nome),
          descricao: temValor('descDpto', payLoad.descricao)
     }
}