const appConfig = require('../config/app.config')

if (!appConfig) {
  throw "App config missing! Please provide config file at root directory/config/app.config.js in specify format!"
}

const MainSwitch = appConfig.Enable_Console_Print
const SQLSwitch = appConfig.Enable_SQL_Query_Info_OutPut
const FSSwitch = appConfig.Enable_FileSystem_Error_OutPut

/**
 * @description 根据app.config.js配置内容控制控制台输出内容
 * @param source {string} SQL或FS
 * @param message {any} 控制台输出内容
 */
const consoleOutput = (source,message) => {
  if (!MainSwitch) return
  switch (source) {
    case "SQL":
      if (SQLSwitch) console.log(message)
      break
    case "FS":
      if (FSSwitch) console.log(message)
      break
  }
}

module.exports = consoleOutput
