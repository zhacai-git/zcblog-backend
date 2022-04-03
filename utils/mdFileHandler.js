const fs = require('fs')
const query = require('./queryInterfaces')
const FILEDIR = __dirname + '/../uploadFiles/docs'

/**
 * @description 向根目录/uploadFiles/docs/年/月 中写入MD文档
 * @param time {string} 时间，请利用标准时间生成工具，用.区分
 * @param title {string} 文章标题，用于标注文档
 * @param author {string} 文章作者，用于标注文档
 * @param detail {string} MD格式的文章内容
 * @description 写入后的文件名格式：author-title.md
 */
const writeNew = (time,title,author,detail) => {
  return new Promise((resolve, reject) => {
    let timeArr = time.split('.')
    let year = timeArr[0]
    let month = timeArr[1]
    let pathDir = FILEDIR + '/' + year + '/' + month
    if (fs.existsSync(pathDir)) {
      // 存在路径，准备写入
      fs.writeFile(pathDir + '/' + author + '-' + title + '.md',detail,err => {
        if (err) reject("cannot write file! Please check the existence of path or permission of the target directory!")
      })
      resolve("file write done")
    } else {
      fs.mkdir(FILEDIR + '/' +year,err => {
        fs.mkdir(FILEDIR + '/' + year + '/' + month,err => {
          if (err) reject("path doesn't exist and cannot be created, PLEASE CHECK THE PERMISSION!")
          fs.writeFile(pathDir + '/' + author + '-' + title + '.md',detail,err => {
            fs.stat(pathDir + '/' + author + '-' + title + '.md',(err1, stats) => {
              if (err) reject("file not exits")
            })
            if (err) reject("cannot write file! Please check the existence of path or permission of the target directory!")
          }) // 无异常则为创建文件并写入成功
        })
      }) // 如果无异常则创建成功

      resolve("file wrote done")
    }
  })
}

module.exports.writeNew = writeNew

/**
 * @description 覆写原有文件，用于文章更新
 * @param article_id {number} 文章ID，用于查询推送时间和定位文章
 * @param title {string} 文章标题，用于文章确认或者文章标题修改
 * @param detail {string} 修改后的内容
 * @return {Promise<unknown>}
 */
const overwriteExist = (article_id,title,detail) => {
  return new Promise((resolve, reject) => {
    let time
    let formerTitle
    let author
    query({
      name: 'fsGetArticleInfo',
      params: {
        article_id
      }
    }).then(res => {
      console.log(res)
      if (res.length === 0) {
        reject("article does not exist!")
      }
      time = res[0].post_time
      formerTitle = res[0].title
      author = res[0].author
      console.log(time)
      let timeArr = time.split('.')
      let year = timeArr[0]
      let month = timeArr[1]
      let pathDir = FILEDIR + '/' + year + '/' + month
      let fileName = '/' + author + '-' + title + '.md'
      if (fs.existsSync(pathDir)) {
        if (formerTitle !== title) {
          let formerPathDir = FILEDIR + '/' + year + '/' + month + '/' + author + '-' + formerTitle + '.md'
          fs.unlink(formerPathDir,err => {
            if (err) reject("Delete old file failed, please check for the permission!")
          })
        }
        fs.writeFile(pathDir + fileName,detail,err => {
          if (err) reject("Overwrite file failed, please check if the target file exists or the permission!")
        })
        resolve("Overwrite file done")
      } else {
        fs.mkdir(FILEDIR + '/' +year,err => {
          fs.mkdir(FILEDIR + '/' + year + '/' + month,err => {
            // if (err) reject("path doesn't exist and cannot be created, PLEASE CHECK THE PERMISSION!")
            fs.writeFile(pathDir + '/' + author + '-' + title + '.md',detail,err => {
              fs.stat(pathDir + '/' + author + '-' + title + '.md',(err1, stats) => {
                if (err) reject("file not exits")
              })
              if (err) reject("cannot write file! Please check the existence of path or permission of the target directory!")
            }) // 无异常则为创建文件并写入成功
          })
        })
      }
    }).catch(err => {
      reject("SQL ERR")
    })
  })
}

module.exports.overwriteExist = overwriteExist

/**
 * @description 读取md文件，返回内容
 * @param time {string} 时间，用于定位文件
 * @param author {string} 作者，用于定位文件
 * @param title {string} 标题，用于定位文件
 * @return {Promise<unknown>}
 */
const getMarkdown = (time,author,title) => {
  return new Promise((resolve, reject) => {
    let timeArr = time.split('.')
    let year = timeArr[0]
    let month = timeArr[1]
    fs.readFile(FILEDIR + '/' + year + '/' + month + '/' + author + '-' + title + '.md',"utf8",(err, data) => {
      console.log(err)
      if (err) reject("Read markdown doc failed")
      resolve(data)
    })
  })
}

module.exports.getMarkdown = getMarkdown
