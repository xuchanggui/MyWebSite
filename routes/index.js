
/*
 *路由转发模块
 */
var crypto=require('crypto');
var User = require('../models/user');
var formidable=require("../node_modules/formidable");
var fs = require('fs');
var util = require('util');
var path = require('path'),
	TITLE = 'insupper',
	uploadDir = "G:/NodeJs_Runtime/nodejsApp/temp/"
module.exports=function(app){



//start
/* GET home page. */

/*app.get('/',function(req, res) {
  res.render('index', { title: TITLE });
});

app.post('/upload', function (req, res) {
	console.log("开始解析");

  for (var i in req.files) {
    if (req.files[i].size == 0){
      // 使用同步方式删除一个文件
      fs.unlinkSync(req.files[i].path);
      console.log('Successfully removed an empty file!');
    } else {
     var target_path = uploadDir+ req.files[i].name;
      // 使用同步方式重命名一个文件
      //fs.renameSync(req.files[i].path, target_path);
	var readStream = fs.createReadStream(req.files[i].path)
	var writeStream = fs.createWriteStream(target_path);

	util.pump(readStream, writeStream, function() {
	fs.unlinkSync(req.files[i].path);
	console.log('临时文件已被删除');
	});
	console.log('Successfully renamed a file!');
	}
  }
  req.session.success="文件上传成功";
  res.redirect('/');
});*/

//end






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
 User.findUserByMobile(mobile,function(err,user){
 	if(user){
 		err='Username already exists';
 	}
 	console.log("err===="+err);
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
 User.findUserByMobile(mobile,function(err,user){
 	if(!user){
 		err='用户不存在!';
		req.session.error=err;
		return res.redirect('/login');
 	}
 	console.log("password1==="+password);
 	console.log("password2==="+user.password);
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


//上传图片请求
app.post('/upload', function (req, res) {
	console.log("开始解析");

  for (var i in req.files) {
    if (req.files[i].size == 0){
      // 使用同步方式删除一个文件
      fs.unlinkSync(req.files[i].path);
      console.log('Successfully removed an empty file!');
    } else {
     var target_path = uploadDir+ req.files[i].name;
      // 使用同步方式重命名一个文件
      //fs.renameSync(req.files[i].path, target_path);
	var readStream = fs.createReadStream(req.files[i].path)
	var writeStream = fs.createWriteStream(target_path);

	util.pump(readStream, writeStream, function() {
	fs.unlinkSync(req.files[i].path);
	console.log('临时文件已被删除');
	});
	console.log('Successfully renamed a file!');
	}
  }
  req.session.success="文件上传成功";
  res.redirect('/');
});

app.get('/project',function(req,res){
	res.render('start_dream', { title: '发起我的项目'});
});


app.get('/project-info',function(req,res){
	res.render('project-info', { title: '我的项目'});
});

app.post('/project-info',function(req,res){
	res.render('project-info', { title: '我的项目'});
});

app.post('/checkUserAndPassword',function(req, res){
//生成口令的数列值return 
var md5=crypto.createHash('md5');
var mobile=req.body.mobile;
var password=md5.update(req.body.password).digest('base64');
 //检查用户名是否已经存在
 console.log("mobile===="+mobile);
 User.findUserByMobile(mobile,function(err,user){
 	if(!user){
 		err='用户不存在!';
 		console.log("err==="+err);
 		req.session.error=err;
		res.json({"error":err});
		return;
 	}
 	console.log("password1==="+password);
 	console.log("password2==="+user.password);
	if(user.password!=password){
		err="用户密码错误";
		req.session.error=err;
		res.json({"error":err});
       return;
	}
 	req.session.user=user;
 	req.session.error=null;
    req.session.success="验证通过";
	res.json({"success":"验证通过"});
	//req.session.user=user;
 });
});

app.get('/home',checkLogin);
app.get('/home',function(req, res){
res.render('home', { title: 'Home'});
});

app.get('/logout',checkLogin);
app.get('/logout',function(req, res){
req.session.user=null;
req.session.error=null;
req.session.success=null;
res.redirect('/');
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