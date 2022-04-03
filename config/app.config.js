module.exports = {
  // 模式选择：开发|生产
  ENV_MODE: 'dev', // dev|prod
  // 开发服务器端口
  DEV_PORT: 3000, // Development server port
  // 生产服务器端口
  PROD_PORT: 3000, // Production server port
  // 允许跨域，在生产环境不推荐，建议关闭
  Allow_Cross_Origin: false, // For development purpose only, NOT recommend to use in production environment
  // Token验证器选项，仅供开发环境DEBUG使用，关闭会导致管理员后台无Token也可访问，造成问题
  Enable_Token_Validate: true, // For development debug only, DO NOT modify unless you know what you're doing
  // Express自带的渲染引擎，这里因为使用Vue前端组件故关闭，若开启，需在根目录下创建views文件夹并且使用jade编辑网页
  Enable_View_Engine: false, // Integrated view engine, make a directory named views in root directory if enabled, NOT recommended
  // 控制台输出总开关，输出包括：访问记录，SQL查询结果，fs模块读写错误
  Enable_Console_Print: true, // Allow console information output, this is a main switch
  // SQL查询结果控制台输出单独开关，非必要就不开了
  Enable_SQL_Query_Info_OutPut: false, // Dedicated output switch for sql query result output
  // fs模块错误输出单独开关，DEBUG可开，正常不会有输出，一般情况下出错也就是权限出问题了，检查下文件夹权限就好
  Enable_FileSystem_Error_OutPut: false // Dedicated output switch for fs module error message output
}
