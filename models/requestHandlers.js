      
var url=require("url");
var util = require('util');
var crypto=require('crypto');
var User = require('./user');
var User_Project_Info = require('./user_project_info');
var path = require('path');
fs=require("fs");
formidable=require("formidable");
uploadDir = "G:/NodeJs_Runtime/nodejsApp/MyWebSite/public/images/"
temp="G:/NodeJs_Runtime/nodejsApp/temp/";

function reg(req,res){
//检查用户两次输入的口令是否一致
if(!(req.body['confirm_password'])||!(req.body['password'])||!(req.body['mobile']))
{
	err="密码或者手机号码不能为空!";
	req.session.error=err;
	return res.redirect('/reg');
}

len=req.body.mobile.length;
console.log("登录mobile的长度====="+len);
if(len==0){
	err="请输入手机号码";
	console.log(err);
	req.session.error=err;
	return res.redirect('/reg');
}else if(len!=11){
	err="请输入正确长度的手机号码";
    console.log(err);
    req.session.error=err;
	return res.redirect('/reg');
}else if(isNaN(len)){
    err="您输入的手机号码格式不对,请输入正确的手机号码";
    console.log(err);
    req.session.error=err;
	return res.redirect('/reg');
}

len=req.body.password.length;
if(len==0){
	err="密码不能为空,请输入密码!";
	console.log(err);
	req.session.error=err;
	return res.redirect('/reg');
}else if((len)<6||(len>16)){
	err="您输入的密码长度有误，密码不能小于六位，同时也不能大于十六位！";
	console.log(err);
	req.session.error=err;
	return res.redirect('/reg');
}

if(req.body['confirm_password']!=req.body['password']){
	err="两次输入的口令不一致!";
	console.log(err);
	req.session.error=err;
    return res.redirect('/reg');
}

var reg=/\s/g;
if(req.body.username==""){
    err="输入的昵称不能为空!";
    console.log(err);
	req.session.error=err;
    return res.redirect('/reg');
}else if(req.body.username.length>15){
    err="输入昵称的长度不对，请重新输入！";
    console.log(err);
	req.session.error=err;
    return res.redirect('/reg');
}else if(reg.test(req.body.username)){
	err="输入内容包含空格，请出新输入!";
	console.log(err);
	req.session.error=err;
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
 }


function login(req, res){
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
}


function checkUserAndPassword(req, res){
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
 });
}


//保存项目信息
function project_info_save(req,res){

/*//检查用户两次输入的口令是否一致
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
var md5=crypto.createHash('md5');*/
var name=req.body.name;
var limit_price=req.body.limit_price;
var deal_days=req.body.deal_days;
var category=req.body.category;
var project_location=req.body.project_location;
var city=req.body.city;
var vedio_url=req.body.vedio_url;
var project_brief=req.body.project_brief;
var project_details=req.body.project_details;
var user_mobile=req.body.user_mobile;
var tags=req.body.tags;

var user_project_info=new User_Project_Info(
{
  name:name,//项目名称
  limit_price:limit_price,//筹集金额
  deal_days:deal_days,//筹集天数
  category:category,//筹集类别
  project_location:project_location,//项目地点
  city:city,//所在城市
  vedio_url: vedio_url,//项目视频地址
  project_brief: project_brief,//项目简介
  project_details: project_details,//项目详情 
  user_mobile: user_mobile,//项目发起者手机号码(这是唯一的主键)
  tags:tags//项目标签
});
	console.log("name====="+name);
	console.log('limit_price======'+limit_price);
	console.log('deal_days======'+deal_days);
	console.log("category====="+category);
	console.log('project_location======'+project_location);
	console.log('city======'+city);
	console.log("vedio_url====="+vedio_url);
	console.log('project_brief======'+project_brief);
	console.log('project_details======'+project_details);
	console.log('user_mobile======'+user_mobile);
	console.log('tags======'+tags);
 //检查用户名是否已经存在
 User_Project_Info.findUserProjectInfoByMobile(user_mobile,function(err,project_info){
 	console.log("通过手机号码查询项目信息");
 	if(project_info){
 		err='user_project_info already exists';
 	}
 	console.log("err===="+err);
 	if(err){
 		req.session.error=err;
 		return res.redirect('/project-info');
 	}
 	 //console.log("执行到了5");
 	//如果用户不存在则新增用户
 	user_project_info.save(function(err){
 	if(err){
 		console.log("保存项目信息出错==="+err);
 		req.session.error=err;
 		//console.log("执行到了6");
 		return res.redirect('/');
 	}
   // console.log("执行到了7");
 	//req.session.user=newUser;
	req.session.success='项目信息保存成功!'
 	return res.redirect('/project_returns');	
 	});
 });
}


function logout(req, res){
req.session.user=null;
req.session.error=null;
req.session.success=null;
res.redirect('/');
}

function start(response){
	console.log("this start funtion is called");
	var body='<html>'+'<head>'+'<meta http-equiv="Content-Type"  content="text/html;charset=UTF-8"/>'+'</head>'+'<body>'+'<form action="/upload" enctype="multipart/form-data" method="post">'+'<input type="file" name="upload" multiple="multiple">'+'<input type="submit" value="上传文件"/>'+'</form>'+'</body>'+'</html>';
	response.writeHead(200,{"Content-Type":"text/html"});
	response.write(body);
	response.end();
}

function upload_bak(response,request){	
	console.log("this  upload function is called");
	var form=new formidable.IncomingForm();
	var time=new Date().getTime();
	form.uploadDir="G:/NodeJs_Runtime/nodejsApp/temp"
	console.log("begain to parse");
	form.parse(request,function(error,fields,files){
		console.log("parsing done");
		console.log("files.upload.path======"+files.upload.path);
		console.log("time===="+time);
		fs.renameSync(files.upload.path,temp+time+".jpg");
		response.writeHead(200,{"Content-Type":"text/html"});
	    response.write("received image:<br/>");
	    response.write("<img  src='/show?time="+time+"' width='393' height='436'/>");
	    response.end();
	});
}

function upload(req, res) {
	req.session.success=null;
	req.session.error=null;
  console.log("开始解析");
  for (var i in req.files) {
  	console.log("文件大小信息==="+req.files[i].size);
  	console.log("文件类型==="+req.files[i].type);
  	if(req.files[i].type!="image/jpeg"&&req.files[i].type!="image/bmp"){
  	 err="上传的图片类型不正确!";
     req.session.error=err;
     console.log(err);
  	}else if(req.files[i].size>1048576){  	//1M=lo48576;
  		err="文件大小最多不超过1M，请从新上传!";
  		console.log(err);
  		req.session.error=err;
  		fs.unlinkSync(req.files[i].path);
        console.log('Successfully removed an temporary file!');
        
  	}else if (req.files[i].size == 0){
      // 使用同步方式删除一个文件
      fs.unlinkSync(req.files[i].path);
      err="请选择要上传的文件";
      req.session.error=err;
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
	req.session.picture_url=req.files[i].name;
	}
  }
  if(req.session.error){
  	console.log("有错误信息");
  	res.redirect('/project-info');
  	return;
  }
  succ="文件上传成功";
  req.session.success=succ;
  console.log(succ);
  res.redirect('/project-info');
}

function loadPic(response){
	console.log("this  loadPic function is called");
	response.writeHead(200,{"Content-Type":"text/html"});
	response.write("hello loadPic");
	//return "hello loadPic";
	response.end();
}

function show(response,request){
	console.log("request handler 'show' was called.");
	 var arg = url.parse(request.url,true).query;
	 console.log("time==="+arg.time);
	fs.readFile(temp+arg.time+".jpg","binary",function(error,file){
		if(error){
			response.writeHead(500,{"Content-Type":"text/plain"});
			response.write(error+"\n");
			response.end();

		}else{
			response.writeHead(200,{"Content-Type":"image/jpg"});
			response.write(file,"binary");
			response.end();
		}
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

exports.start=start;
exports.upload=upload;
exports.loadPic=loadPic;
exports.show=show;
exports.checkLogin=checkLogin;
exports.checkNotLogin=checkNotLogin;
exports.reg=reg;
exports.login=login;
exports.project_info_save=project_info_save;
exports.checkUserAndPassword=checkUserAndPassword;
exports.logout=logout;