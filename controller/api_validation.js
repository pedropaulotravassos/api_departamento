const { isString } = require("lodash");

exports.temValor = function (chave, valor) {
    if (!valor)
        throw { msg: `Valor obrigatório ${chave}, não foi preenchido`, status: 400 };
    return valor
}

exports.eNumero = function (chave, valor) {
    if (isNaN(valor))
        throw { msg: `Campo ${chave}, só aceita valores numericos`, status: 400 }
    return valor
}
exports.NeNumero = function (chave, valor) {
    if (!isNaN(valor))
        throw { msg: `Campo ${chave}, não aceita valores numericos`, status: 400 }
    return valor
}

exports.validaTamanho = function (chave, valor, tamanho) {
    if (!isString(valor) || valor.length != tamanho)
        throw {
            msg: `Valor do campo ${chave}, não tem o tamanho de ${tamanho} caracteres`,
            status: 400
        }
    return valor
}

exports.validaRetornoCql = function (node, where, result) {
    if (!result || !Array.isArray(result) || !result.length) {
        throw {
            msg: `Query de ${node} com ${where} , não existe resultado para a consulta`,
            status: 400
        }
    }
    return result
}