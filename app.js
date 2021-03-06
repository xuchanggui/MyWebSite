
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
//var SessionStore = require("session-mongoose")(express);
var app = express();
app.use(flash());
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
//ssession组件
app.use(session({
      secret : settings.cookieSecret,
      cookie : {maxAge : 72000},
      store : new MongoStore({
          db : settings.db
      }),
      resave : true,
      saveUninitialized : true
  }));

//视图助手
//start
app.use(function(req, res, next){
res.locals.user = req.session.user;
var err = req.session.error;
var succ =req.session.success;
res.locals.error =err;
res.locals.success = succ;
if(err){
 	console.log("错误提示信息=============="+err);
}
if(succ){
 	console.log("成功提示信息=============="+succ);
}
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
  console.log('Express server listening on port ' + app.get('port'));
});
