      
var url=require("url");
var util = require('util');
var crypto=require('crypto');
var User = require('./user');
var User_Project_Info = require('./user_project_info');
var User_Project_Returns_Info = require('./user_project_returns_info');
var Author_Information = require('./author_information');
var path = require('path');
fs=require("fs");
formidable=require("formidable");
uploadDir = "G:/NodeJs_Runtime/nodejsApp/MyWebSite/public/images/"
temp="G:/NodeJs_Runtime/nodejsApp/temp/";
var returns_arr=new Array();

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


//窗体登录
function login_form(req,res){
//生成口令的数列值return 
var md5=crypto.createHash('md5');
var mobile=req.body.mobile;
var password=md5.update(req.body.password).digest('base64');
 //检查用户名是否已经存在
 console.log("mobile===="+mobile);
 console.log("password===="+password);
 User.findUserByMobile(mobile,function(err,user){
 	if(!user){
 		err='用户不存在!';
		req.session.error=err;
		return res.redirect('/login');
 	}
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
	return res.redirect('/project-info');
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
	req.session.success=null;
	req.session.error=null;
	//验证提交表单的内容
	if(!validate_project_info(req,res)){
		err="请仔细检查所填写的内容是否有误";
		req.session.error=err;
		console.log("验证表单不通过");
		return res.redirect('/project-info');
	}

 //检查用户名是否已经存在
 User_Project_Info.findUserProjectInfoByMobile(req.body.user_mobile,function(err,project_info){
 	console.log("通过手机号码查询项目信息");
 	if(project_info){
 		err='user_project_info already exists';
 	}
 	console.log("err===="+err);
 	if(err){
 		req.session.error=err;
 		return res.redirect('/project-info');
 	}

 	//上传图片
   if(!upload(req,res)){
   	console.log("上传图片失败!");
     return res.redirect('/project-info');
   }
   var user_project_info=getUserProjectInfo(req,res);
	console.log("name====="+user_project_info.name);
	console.log('limit_price======'+user_project_info.limit_price);
	console.log('deal_days======'+user_project_info.deal_days);
	console.log("category====="+user_project_info.category);
	console.log("pic_path===="+user_project_info.pic_path);
	console.log('project_location======'+user_project_info.project_location);
	console.log('city======'+user_project_info.city);
	console.log("vedio_url====="+user_project_info.vedio_url);
	console.log('project_brief======'+user_project_info.project_brief);
	console.log('project_details======'+user_project_info.project_details);
	console.log('user_mobile======'+user_project_info.user_mobile);
	console.log('tags======'+user_project_info.tags);
     	//如果用户不存在则新增用户
 	user_project_info.save(function(err){
 	if(err){
 		console.log("保存项目信息出错==="+err);
 		req.session.error=err;
 		//console.log("执行到了6");
 		return res.redirect('/project-info');
 	}
   // console.log("执行到了7");
 	//req.session.user=newUser;
	req.session.success='项目信息保存成功!';
	req.session.user_project_info=user_project_info;
 	return res.redirect('/project_returns');	
 	});
 });
}


//保存项目反馈信息
function project_returns_save(req,res){
	req.session.success=null;
	req.session.error=null;
	//验证提交表单的内容
	if(!validate_returns_info(req,res)){
		err="请仔细检查所填写的内容是否有误";
		req.session.error=err;
		console.log("验证表单不通过");
		return res.redirect('/project_returns');
	}

 	//上传图片
   if(!upload(req,res)){
   	console.log("上传图片失败!");
     return res.redirect('/project_returns');
   }
   var user_project_returns_info=getUserProjectReturnsInfo(req,res);
	console.log("price====="+user_project_returns_info.price);
	console.log('description======'+user_project_returns_info.description);
	console.log('image_file======'+user_project_returns_info.image_file);
	console.log("limit_num====="+user_project_returns_info.limit_num);
	console.log("delivery_fee===="+user_project_returns_info.delivery_fee);
	console.log('repaid_day======'+user_project_returns_info.repaid_day);
	console.log('return_type======'+user_project_returns_info.return_type);
	console.log("user_mobile====="+user_project_returns_info.user_mobile);
	console.log("data_id====="+user_project_returns_info.data_id);
     	//如果用户不存在则新增用户
 	user_project_returns_info.save(function(err){
 	if(err){
 		console.log("保存项目反馈信息出错==="+err);
 		req.session.error=err;
 		//console.log("执行到了6");
 		return res.redirect('/project_returns');
 	}
   // console.log("执行到了7");
 	//req.session.user=newUser;
 	returns_arr.push(user_project_returns_info);
    //returns_arr.splice(1,1);
	req.session.success='项目反馈信息保存成功!';
	req.session.returns_arr=returns_arr;
	req.session.user_project_returns_info=req.session.returns_arr;
 	return res.redirect('/project_returns');	
 	});



}


function delete_user_project_returns_info(req,res){
var data_id=req.query.data_id;
console.log("data_id==="+data_id);
//先删除session缓存的数据
returns_arr=req.session.user_project_returns_info;
for(var i=0;i<returns_arr.length;i++){
	if(returns_arr[i].data_id==data_id){
		console.log("删除的data_id=="+data_id);
		returns_arr.splice(i,1);
		console.log("returns_arr.length===="+returns_arr.length);
		//重新给session赋值
		req.session.returns_arr=returns_arr;
		req.session.user_project_returns_info=req.session.returns_arr;

	}
}
User_Project_Returns_Info.deleteUserProjectReturnsInfoByData_id(data_id,function(err,result){
 	if(err){
 		err='删除失败!';
 		console.log("err==="+err);
 		req.session.error=err;
		 res.json({"error":err});
		
 	}
 	console.log("result==="+result);
	if(result<=0){
		err="删除记录失败";
		req.session.error=err;
		 res.json({"error":err});
	}
 	succ="删除记录成功!";
    req.session.success=succ;
    res.json({"success":succ});
 });

}


function logout(req, res){
//清除session
console.log("清除session===");
req.session.destroy();

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
  console.log("开始解析");
  for (var i in req.files) {
  	console.log("图片大小信息==="+req.files[i].size);
  	console.log("图片类型==="+req.files[i].type);
  	if(req.files[i].type!="image/jpeg"&&req.files[i].type!="image/bmp"){
  	 err="上传的图片类型不正确!";
     req.session.error=err;
     console.log(err);
     return false;
  	}else if(req.files[i].size>1048576){  	//1M=lo48576;
  		err="图片大小最多不超过1M，请从新上传!";
  		console.log(err);
  		req.session.error=err;
  		fs.unlinkSync(req.files[i].path);
        console.log('Successfully removed an temporary file!');
        return false;
        
  	}else if (req.files[i].size == 0){
      // 使用同步方式删除一个文件
      fs.unlinkSync(req.files[i].path);
      err="请选择要上传的图片";
      req.session.error=err;
      console.log('Successfully removed an empty file!');
      return false;
    } else {
     var target_path = uploadDir+ req.files[i].name;
      // 使用同步方式重命名一个文件
      //fs.renameSync(req.files[i].path, target_path);
	var readStream = fs.createReadStream(req.files[i].path)
	var writeStream = fs.createWriteStream(target_path);

	util.pump(readStream, writeStream, function() {
	fs.unlinkSync(req.files[i].path);
	console.log('临时图片已被删除');
	});
	console.log('Successfully renamed a file!');
	req.session.picture_url=req.files[i].name;
	return true;
	}
  }
  if(req.session.error){
  	console.log(req.session.error);
  	res.redirect('/project-info');
  	return false;
  }
  succ="图片上传成功";
  req.session.success=succ;
  console.log(succ);
  //res.redirect('/project-info');
}

//验证表单的方法
function validate_project_info(req,res){
var name=req.body.name;
var limit_price=req.body.limit_price;
var deal_days=req.body.deal_days;
var category=req.body.category;
var real_pic_url=req.body.real_pic_url;//这里是特殊情况
var project_location=req.body.project_location;
var city=req.body.city;
var vedio_url=req.body.vedio_url;
var project_brief=req.body.project_brief;
var project_details=req.body.project_details;
var user_mobile=req.body.user_mobile;
var tags=req.body.tags;
var agr=req.body.agr;
console.log("验证 name====="+name);
console.log('验证 limit_price======'+limit_price);
console.log('验证 deal_days======'+deal_days);
console.log("验证 category====="+category);
console.log("验证 real_pic_url===="+real_pic_url);
console.log('验证 project_location======'+project_location);
console.log('验证 city======'+city);
console.log("验证 vedio_url====="+vedio_url);
console.log('验证 project_brief======'+project_brief);
console.log('验证 project_details======'+project_details);
console.log('验证 user_mobile======'+user_mobile);
console.log('验证 tags======'+tags);
if(name==""){
	 return false;
	}else if(name.length>40){
	 return false;
	}
if(limit_price==""){
	return false;	
	}else if(limit_price<500){
	return false;
	}	
if(deal_days<10||deal_days>90){
	return false;
	}
if(category==""){
	return false;	
}
if(project_location==""){
	return false;
	}
if(project_brief==""){
	return false;
	}else if(project_brief.length>75){
	return false;
	}
if(project_details==""){
	return false;
	}else if(project_details.length>2000){
	return false;
 }
if(agr==""){
	return false;  
	}

if(tags==""){
	return false;
	}else if(tags.length>12){
	return false;
	}
if(real_pic_url==""){
    return false;
    }
return true;

}

function validate_returns_info(req,res){
	var price=req.body.price;
	var description=req.body.description;
	var image_file=req.body.image_file;
	var limit_num=req.body.limit_num;
	var delivery_fee=req.body.delivery_fee;
	var repaid_day=req.body.repaid_day;
	console.log("验证的price==="+price);
	if(price==""){
       return false;
	}else if(description==""){
	   return false;
	}else if(description.length>500){
		return false;
	}else if(image_file==""){
		return false;
	}else if(limit_num==""){
		return false;
	}else if(delivery_fee==""){
		return false;
	}else if(repaid_day==""){
		return false;
	}

	return true;

}


function getUserProjectReturnsInfo(req,res){
var user_project_returns_info=new User_Project_Returns_Info(
{
  price:req.body.price,//项目名称
  description:req.body.description,//筹集金额
  image_file:req.session.picture_url,//筹集天数
  limit_num:req.body.limit_num,//筹集类别
  delivery_fee:req.body.delivery_fee,
  repaid_day:req.body.repaid_day,//项目地点
  return_type:req.body.returntype,//所在城市
  user_mobile: req.body.user_mobile,//项目视频地址
  data_id:req.body.data_id
}); 
return user_project_returns_info;
}

function getUserProjectInfo(req,res){
var user_project_info=new User_Project_Info(
{
  name:req.body.name,//项目名称
  limit_price:req.body.limit_price,//筹集金额
  deal_days:req.body.deal_days,//筹集天数
  category:req.body.category,//筹集类别
  pic_path:req.session.picture_url,
  project_location:req.body.project_location,//项目地点
  city:req.body.city,//所在城市
  vedio_url: req.body.vedio_url,//项目视频地址
  project_brief: req.body.project_brief,//项目简介
  project_details: req.body.project_details,//项目详情 
  user_mobile: req.body.user_mobile,//项目发起者手机号码(这是唯一的主键)
  tags:req.body.tags//项目标签
}); 
return user_project_info;
}


//保存发起人信息
function save_author_info_detail(req,res){

	//验证提交表单的内容
	if(!validate_author_info_detail(req,res)){
		err="请仔细检查所填写的内容是否有误";
		req.session.error=err;
		console.log("验证表单不通过");
		return res.redirect('/author_info');
	}
	var author_info=new Author_Information(
	{
		ex_real_name:req.body.ex_real_name,
		province:req.body.province,
		city:req.body.city,
		ex_contact:req.body.ex_contact,
		bank_name:req.body.bank_name,
		bank:req.body.bank,
		bank_user_name:req.body.bank_user_name,
		bank_card:req.body.bank_card
	});


 Author_Information.findAuthor_InformationByMobile(req.body.ex_contact,function(err,author_information){
 	if(author_information){
 		err='author_information already exists!';
 			console.log("err===="+err);
 	}
 
 	if(err){
 		req.session.error=err;
 		return res.redirect('/author_info');
 	}

    author_info.save(function(err){
 	if(err){
 		console.log("保存项目发起人信息出错==="+err);
 		req.session.error=err;
 		//console.log("执行到了6");
 		return res.redirect('/author_info');
 	}
	req.session.success='保存项目发起人信息成功!'
 	return res.redirect('/author_info_detail');	
 	});
 });

}


//检查发起人信息
function validate_author_info_detail(req,res){
var ex_real_name=req.body.ex_real_name;
var province=req.body.province;
var city=req.body.city;
var ex_contact=req.body.ex_contact;
var bank_name=req.body.bank_name;
var bank=req.body.bank;
var bank_user_name=req.body.bank_user_name;
var bank_card=req.body.bank_card;
console.log("验证的ex_real_name==="+ex_real_name);
if(ex_real_name==""){
   return false;
}else if(province==""){
   return false;
}else if(city.length>500){
	return false;
}else if(ex_contact==""){
	return false;
}else if(bank_name==""){
	return false;
}else if(bank==""){
	return false;
}else if(bank_user_name==""){
	return false;
}else if(bank_card==""){
    return false;
}

return true;

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
exports.login_form=login_form;
exports.reg=reg;
exports.login=login;
exports.project_info_save=project_info_save;
exports.project_returns_save=project_returns_save;
exports.delete_user_project_returns_info=delete_user_project_returns_info;
exports.save_author_info_detail=save_author_info_detail;
exports.checkUserAndPassword=checkUserAndPassword;
exports.logout=logout;