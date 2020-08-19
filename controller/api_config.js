const QNeo4j = require("@qualitech/qneo4j")
const appConfigs = require('../app-services-configs')
const configs = appConfigs.configs.api_departamento

const dbKeepDriver = new QNeo4j({
    url: configs.url_neo4j_bolt,
    username: configs.neo4j_user,
    password: configs.neo4j_password,
    autoCloseDriver: false,
    driverConfig: {
        maxConnectionLifetime: 3 * 60 * 60 * 1000, // 3 hours
        maxConnectionPoolSize: 10000,
        connectionAcquisitionTimeout: 20 * 60 * 1000 // 1200 seconds
    }
})



async function executeCypherAsync(cqlQuery) {
    try {
        return await dbKeepDriver.execute(cqlQuery)
    } catch (error) {
        console.log(error)
        console.log(cqlQuery)
        throw error
    }
}

module.exports = {
    dbKeepDriver,
    appConfigs: configs,
    executeCypherAsync
}