const resBody = require('./responseTemplate')

function jsonParseErrorHandler(err, req, res, next) {
  if (err instanceof SyntaxError) {
    res.send(resBody(false,"EJSONERR"))
  } else {
    next()
  }
}

module.exports = jsonParseErrorHandler
