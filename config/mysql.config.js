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

// Note: Please add this file to .gitignore to prevent leaking the username and password of the database
// 提示：请务必将此文件添加到.gitignore防止在commit和push的时候导致数据库用户名密码泄露
