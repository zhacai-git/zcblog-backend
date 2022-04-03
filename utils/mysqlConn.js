const mysql = require("mysql")
const store = require('./store')
const mysqlConfig = require('../config/mysql.config')
const appConfig = require('../config/app.config')

let dbInfo = {}

if (!appConfig) {
  throw "App config missing! Please provide config file at root directory/config/app.config.js in specify format!"
} else {
  switch (appConfig.ENV_MODE) {
    case "dev":
      dbInfo = mysqlConfig.dev
      break
    case "prod":
      dbInfo = mysqlConfig.prod
      break
    default:
      dbInfo = mysqlConfig.dev
  }
}

const dbInstance = mysql.createConnection(dbInfo)

dbInstance.connect(err => {
  if (err) throw err
  store.commit('SQLServerConnected')
})

module.exports = dbInstance
