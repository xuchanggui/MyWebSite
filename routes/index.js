
/*
 *路由转发模块
 */
var crypto=require('crypto');
var User = require('../models/user');

module.exports=function(app){
app.get('/',function(req, res){
res.render('index', { title: 'Express' });
});

app.get('/reg',checkNotLogin);
app.get('/reg',function(req,res){
res.render('reg',{title:'注册'});
});

app.post('/reg',checkNotLogin);
app.post('/reg',function(req,res){
//检查用户两次输入的口令是否一致
if(!(req.body['confirm_password'])||!(req.body['password'])||!(req.body['mobile']))
{
	req.session.error='密码或者手机号码不能为空!';
	return res.redirect('/reg');
}
if(req.body['confirm_password']!=req.body['password']){
	req.session.error='两次输入的口令不一致!';
    return res.redirect('/reg');
}
//生成口令的数列值return 
var md5=crypto.createHash('md5');
var username=req.body.username;
var password=md5.update(req.body.password).digest('base64');
var mobile=req.body.mobile;
var newUser=new User(
{
	name:username,
	password:password,
	mobile:mobile
});
 console.log("password====="+newUser.password);
 console.log('username======'+newUser.name);
 console.log('username======'+newUser.mobile);
 //检查用户名是否已经存在
 User.get(newUser.name,function(err,user){
 	if(user){
 		err='Username already exists';
 	}
 	if(err){
 		req.session.error=err;
 		return res.redirect('/reg');
 	}
 	 //console.log("执行到了5");
 	//如果用户不存在则新增用户
 	newUser.save(function(err){
 	if(err){
 		req.session.error=err;
 		//console.log("执行到了6");
 		return res.redirect('/reg');
 	}
   // console.log("执行到了7");
 	req.session.user=newUser;
	req.session.success='注册成功!'
 	return res.redirect('/');	
 	});
 });
 });

app.get('/login',checkNotLogin);
app.get('/login',function(req, res){
res.render('login', { title: '用户登陆'});
});


app.post('/login',checkNotLogin);
app.post('/login',function(req, res){
//生成口令的数列值return 
var md5=crypto.createHash('md5');
var mobile=req.body.mobile;
var password=md5.update(req.body.password).digest('base64');
 //检查用户名是否已经存在
 console.log("mobile===="+mobile);
 User.get(mobile,function(err,user){
 	if(!user){
 		err='用户不存在!';
		req.session.error=err;
		return res.redirect('/login');
 	}
 	if(err){
		req.session.error=err;
 		return res.redirect('/login');
 	}
	if(user.password!=password){
		req.session.error="用户密码错误";
		return res.redirect('/login');
	}
 	req.session.user=user;
    req.session.success="登录成功";
	return res.redirect('/');
 });
});

app.get('/logout',checkLogin);
app.get('/logout',function(req, res){
req.session.user=null;
req.session.error=null;
req.session.success=null;
res.redirect('/');
});

app.get('/home',checkLogin);
app.get('/home',function(req, res){
res.render('home', { title: 'Home'});
});
}

function checkLogin(req,res,next){
	if(!req.session.user){
		req.session.error="未登录";
		return res.redirect('/login');
	}
	next();
}

function checkNotLogin(req,res,next){
	console.log("usename===="+req.session.user);
	if(req.session.user){
        req.session.error="已登录";
		return res.redirect('/');
	}
	next();
}