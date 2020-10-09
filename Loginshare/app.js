var createError = require('http-errors');
var express = require('express');
var cors=require('cors')
const bodyParser=require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var follow = require('./routes/follow');

var app = express();

// 改写
var http = require('http');
var server = http.createServer(app);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// public静态资源
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
// post请求
app.use(bodyParser.urlencoded({extended:true}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/follow', follow);


server.listen('3000')