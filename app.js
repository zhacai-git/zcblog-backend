const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs')
const store = require('./utils/store')
const bodyParser = require('body-parser')

const Api = require('./routes/Api')
const parseJwt = require('express-jwt')

const app = express();
const appConfig = require('./config/app.config')
if (!appConfig) {
  throw "App config missing! Please provide config file at root directory/config/app.config.js in specify format!"
}

if (appConfig.Allow_Cross_Origin) {
  app.all('*', function(req, res, next) {
    //设为指定的域
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("X-Powered-By", ' 3.2.1');
    next();
  });
}

// view engine setup
if (appConfig.Enable_View_Engine) {
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
}

if (appConfig.Enable_Console_Print) {
  app.use(logger('dev'));
}
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(logger('combined', {stream: accessLogStream}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));
const jsonParseErrorHandler = require('./utils/jsonParseErrorHandler')
const TokenErrHandler = require("./utils/tokenErrorHandlerMiddleware");
app.use(jsonParseErrorHandler)
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

if (appConfig.Enable_Token_Validate) {
  app.use(
      parseJwt({
        secret: store.state.PRIVATE_KEY,
        algorithms: ['HS256']
      })
          .unless({
            path: ['/api/articleList','/api/articleDetail','/api/mcServerStatus','/api/adminLogin'] // 地址无需验证的白名单
          })
  )
  const TokenErrHandler = require('./utils/tokenErrorHandlerMiddleware')

  app.use(TokenErrHandler)
}



app.use('/api',Api)
// app.get('/api')


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

store.commit('serverOnReady')

module.exports = app;
