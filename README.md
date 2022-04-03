# zcblog-backend
### 榨菜的博客后端程序，基于nodejs打造。使用Mysql作为数据库。
### nodejs初学作品，请积极反馈问题，感谢！

### ZC's blog backend application, built on nodejs. Use Mysql as database.
### nodejs beginner's work, please actively feedback questions, thanks!


## 用法 Usage
### 克隆项目到本地 Clone prject
```shell
git clone
```

首先配置app.config.js与mysql.config.js

First configure app.config.js and mysql.config.js

### app.config.js文件格式：app.config.js file format
```json
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
```
### mysql.config.js文件格式 mysql.config.js file format:
```json
module.exports = {
  dev: {
    host: 'localhost',
    user: 'root',
    password: 'yourDataBasePassword',
    database: 'yourDataBaseNameHere',
    port: '3306'
  },
  prod: {
    host: 'localhost',
    user: 'root',
    password: 'yourDataBasePassword',
    database: 'yourDataBaseNameHere',
    port: '3306'
  }
}
```
### ./utils/store.js:
请修改state中的PRIVATE_KEY为个人自定义的密钥，用于Token生成。EXPIRES_TIME为Token过期时间。

Please modify PRIVATE_KEY in state to be a personal custom key for Token generation, and EXPIRES_TIME to be the Token expiration time.
## 数据库表结构 Database table structure

### articledata:
|  keys   | article_id| author |post_time|brief_intro|detail|title|last_modified|hide_content
|  ----  | ----|----|----|----|----|----|----|----
| type  | int | varchar|varchar|varchar|mediumtext |varchar|varchar|int
|  | 主键Primary key | | | |可选Optional|

### platform_statistics:
|keys|params|value|
|----|----|----
|type|varchar|mediumint
|example|views|0|

### usertable:
|keys|userid|user_type|username|password|session_token|
|----|----|----|----|----|----|
|type|int|varchar|varchar|varchar|varchar
||||||开发中，可选Under development, optional|


## 配置完成后 After configuration
### 运行项目 Run projects
```shell
npm install
node ./bin/www
```
### 推荐使用pm2进行进程管理 Recommended use of pm2 for process management
```shell
npm install pm2 -g
```

### 目前项目前端暂无开源计划。本项目仅供参考和技术交流，无任何生产价值，请勿将其用于任何商业项目，本人不对其可靠性做任何保证。
### Currently the project front-end is not open source plan. This project is for reference and technical exchange only, without any production value. Please do not use it for any commercial projects, I DO NOT make any guarantees for its reliability.