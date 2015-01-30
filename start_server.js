
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var session = require('express-session');
var MongoStore=require('connect-mongo')(express);
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var flash = require('connect-flash');
var settings=require('./settings');
var partials = require('express-partials');
var moment = require('moment');
var time=new Date().getTime();
//var SessionStore = require("session-mongoose")(express);
var app = express();
app.use(flash());
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(partials());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({
          keepExtensions:false,
          limit:10000000,// 10M limit
          defer:false//enable event           
        }));
app.use(express.methodOverride());
app.use(express.cookieParser());
//ssession组件
app.use(session({
      secret : settings.cookieSecret,
      cookie : {maxAge : 6000000},
      store : new MongoStore({
          db : settings.db
      }),
      resave : true,
      saveUninitialized : true
  }));


console.log("main===");
console.log("初始化时间==="+time);

//视图助手
//start
app.use(function(req, res, next){
console.log(moment(new Date()).format('YYYY-MM-DD'));
res.locals.user = req.session.user;
res.locals.user_mobile=req.session.user_mobile;
res.locals.user_project_info = req.session.user_project_info;
var flag=req.session.flag;
var err = req.session.error;
var succ =req.session.success;
var pic_url=req.session.picture_url;
var user=res.locals.user;
res.locals.error ="";
res.locals.success = "";
res.locals.picture_url="";

if(user){
  //将时间统计成秒形式
  console.log("用户存在!");
  console.log("时间差==="+(new Date().getTime()-time));
  if(new Date().getTime()-time>600000){
  console.log("登录超时,请从新登录"); 
  time=new Date().getTime();
  return res.redirect('/logout');
  }
  time=new Date().getTime();
  console.log("当前时间==="+time);
}

if(pic_url){
  res.locals.picture_url=pic_url;
  console.log("图片名称=============="+pic_url);
}
if(flag){
  res.locals.flag=flag;
}else{
  flag=1;
  res.locals.flag=flag;
}
if(err){
  res.locals.error=err;
 	console.log("错误提示信息=============="+err);
}
if(succ){
  res.locals.success=succ;
 	console.log("成功提示信息=============="+succ);
}
console.log("================");
res.locals.message = '';
if (err) res.locals.message = '<div class="alert alert-error">' + err + '</div>';
next();
});
//end

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);//这个是新加的
http.createServer(app).listen(app.get('port'), function(){
  console.log('Http server listening on port ' + app.get('port'));
});
