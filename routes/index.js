module.exports = function (app){
  app.get('/',function(req, res){
    res.render("index",{title:"express"})
  })
  app.use('/signin',require('./signin'))
  app.use('/signup',require('./signup'))
  
}