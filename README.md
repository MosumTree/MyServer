# MyServer
The Server of MyWebsite
## 项目结构
最初是使用express-generator自动生成的一个模板项目。所以我们可以先来看一下整个项目的结构。
```
MyServer    
    |--bin--www.js  
    |--public   
        |--stylesheet--style.css    
        |--...  
    |--route    
        |--index.js 
        |--users.js 
        |--...  
    |--views    
        |--index.ejs    
        |--...  
    |--app.js   
    |--package.json 
    |---...    
```
明显可以看出来这里面处理项目逻辑操作的只有3类js文件：
- www.js
- index.js
- app.js    

当然要理解一个项目，我觉得从项目的入口切入是较为合适的，因为这样更符合人的思维。严格上来说我觉得www才是入口文件，因为我们得先依靠www起一个本地服务，才能进入app.js的逻辑操作。

## app.js
```js
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
```
大致看一下js的代码，我们会发现除了前面引入了一堆我们很多都不清楚的module，绝大部分的操作都是一个叫**app**的**express**对象实例完成的。
### 设置模板引擎
需要在应用中进行如下设置才能让 Express 渲染模板文件：

- views, 放模板文件的目录，比如： app.set('views', './views')
- view engine, 模板引擎，比如： app.set('view engine', 'ejs')

代码中指定了项目的模板目录在view下，模板引擎使用的是ejs，相比于jade，ejs更符合html的写法，易于上手。类似于这样
```html
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>
  </body>
</html>
```

最后我们是在路由匹配时决定渲染的页面来按需使用模板，这个之后再看。
### 中间件
中间件可以说是express框架的核心，也就是我们在app.js中引入的一大堆module。引入之后，express对象通过use方法来使用它们。先把用到的这几个中间件学习一下。
#### morgan
这是中间件可以记录下服务器接接收到的每一次http请求并生成一个记录文件。
#### bodyParser
#### cookieParser

## 接口说明
### 文章
get
#### ARTICALlist
接受参数 : request.ARTICALListSort

返回数据：
```json
{
  Datas:[
    {articalId:1,articalTitle:"title1",publishTime:"time1",author:"author1",articalSummary:"",visitedTimes:20},
    {articalId:2,articalTitle:"title2",publishTime:"time2",author:"author2",articalSummary:"",visitedTimes:20}
  ],
  ErrCode:2,
  ErrMsg:"sample string 2",
  TotalCount:2
}
```
#### ARTICALitem
接受参数：request.ARTICALid

返回数据：
```json
{
  Datas:{
    aricalId:1,
    articalTitle:"title1",
    aricalContent:"content",
    articalSummary:"summary",
    author:"author1",
    publishTime:"time1"
  },
  ErrCode:2,
  ErrMsg:"sample string 2",
}
```