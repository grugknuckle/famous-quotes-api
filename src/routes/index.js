

module.exports = function (app) {
  
  app.use('/', require('./views'))
  app.use('/quotes', require('./quotes'))
}