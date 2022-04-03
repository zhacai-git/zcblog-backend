module.exports = [
  {
    name: 'articleList',
    statement: 'select article_id,author,post_time,brief_intro,title from articledata where hide_content = 0 order by article_id desc, article_id asc limit ?,?',
    needParams: true,
    params: {
      current: 'number',
      target: 'number'
    }
  },
  {
    name: 'articleDetail',
    statement: 'select title,post_time,last_modified,author from articledata where article_id = ? and hide_content = 0',
    needParams: true,
    params: {
      article_id: 'number'
    }
  },
  {
    name: 'adminVerify',
    statement: 'select * from usertable where username = ? and password = ?;',
    needParams: true,
    params: {
      username: 'string',
      password: 'string'
    }
  },
  {
    name: 'articleCount',
    statement: 'select count(*) as postNums from articledata where hide_content = 0',
    needParams: false
  },
  {
    name: 'adminViews',
    statement: 'select value from platform_statistics where params = \'viewers\'',
    needParams: false
  },
  {
    name: 'adminArticleList',
    statement: 'select article_id,author,post_time,brief_intro,title,last_modified,hide_content from articledata order by article_id desc',
    needParams: false
  },
  {
    name: 'adminArticleDetail',
    statement: 'select article_id,author,post_time,brief_intro,title,last_modified,hide_content from articledata where article_id = ?',
    needParams: true,
    params: {
      article_id: 'number'
    }
  },
  {
    name: 'adminArticleFromSql',
    statement: 'select article_id,author,post_time,brief_intro,title,detail,last_modified,hide_content from articledata where article_id = ?',
    needParams: true,
    params: {
      article_id: 'number'
    }
  },
  {
    name: 'adminArticlePost',
    statement: "insert into articledata (author,post_time,brief_intro,detail,title,last_modified,hide_content) values (?,?,?,?,?,?,?)",
    needParams: true,
    params: {
      author: 'string',
      post_time: 'string',
      brief_intro: 'string',
      detail: 'string',
      title: 'string',
      last_modified: 'string',
      hide_content: 'number'
    }
  },
  {
    name: 'adminEditArticle',
    statement: "update articledata set brief_intro = ?, title = ?, last_modified = ?, hide_content = ? where article_id = ?",
    needParams: true,
    params: {
      brief_intro: 'string',
      title: 'string',
      last_modified: 'string',
      hide_content: 'number',
      article_id: 'number'
    }
  },
  {
    name: 'fsGetArticleInfo',
    statement: "select post_time,title,author from articledata where article_id = ?",
    needParams: true,
    params: {
      article_id: 'number'
    }
  },
]
