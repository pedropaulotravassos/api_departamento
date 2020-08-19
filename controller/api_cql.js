exports.cql = {
    salvarDepartamento(depto) {
        const params = { ...depto }
        const cypher = `
        MERGE (d:Departamento{codigo:$codigo})
        ON CREATE SET 
            d.codigo = $codigo,
            d.nome = $nome,
            d.descricao = $descricao
        ON MATCH SET 
            d.nome = $nome,
            d.descricao = $descricao
        RETURN d as depto
        `
        return { cypher, params }
    },
    listarDepartamentos() {
        const params = {}
        const cypher = `
        MATCH (d:Departamento)
        RETURN 
            d.codigo as codigo,
            d.nome as nome, 
            d.descricao as descricao
        `
        return { cypher, params }
    },
    listarDeptoPorCod(codigo) {
        const params = { codigo }
        const cypher = `
        MATCH (d:Departamento)
        WHERE d.codigo = $codigo
        RETURN 
            id(d) as id,
            d.codigo as codigo,
            d.nome as nome, 
            d.descricao as descricao
        `
        return { cypher, params }
    },

}