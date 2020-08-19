const { Departamento } = require('./api_model')

exports.salvaDepartamento = async function (req, res, next) {
    try {
        const payLoad = typeof (req.body) == 'string' ? JSON.parse(req.body) : req.body

        const result = await Departamento.salvar(payLoad)

        res.send(result);

    } catch (err) {
        tratativaErros(err, res);
        return next(err)
    }

    return next()
}
exports.listaDepartamentos = async function (req, res, next) {
    try {
        const result = await Departamento.listar()

        res.send(result);

    } catch (err) {
        tratativaErros(err, res);
        return next(err)
    }

    return next()
}
exports.listaDeptoPorCod = async function (req, res, next) {
    try {
        const result = await Departamento.listarPorCod(req.params.cod)

        res.send(result);

    } catch (err) {
        tratativaErros(err, res);
        return next(err)
    }

    return next()
}

function tratativaErros(err, res) {
    console.log(err);
    if (err.status) {
        res.status(err.status);
    }
    if (err.msg) {
        res.send(err.msg);
    }
    else {
        res.status(500);
        res.send(err);
    }
}