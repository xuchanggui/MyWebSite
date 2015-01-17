
/*
 *路由转发模块
 */
var requestHandlers=require('../models/requestHandlers');
var	TITLE = 'insupper';
module.exports=function(app){

app.get('/',function(req, res){
	console.log("cest");
res.render('index', { title: 'Express' });
});

app.get('/reg',requestHandlers.checkNotLogin);
app.get('/reg',function(req,res){
res.render('reg',{title:'注册'});
});

app.post('/reg',requestHandlers.checkNotLogin);
app.post('/reg',requestHandlers.reg);

app.get('/login',requestHandlers.checkNotLogin);
app.get('/login',function(req, res){
res.render('login', { title: '用户登陆'});
});


app.post('/login',requestHandlers.checkNotLogin);
app.post('/login',requestHandlers.login);

app.post('/login',requestHandlers.checkNotLogin);
app.post('/login_form',requestHandlers.login_form);
//上传图片
app.post('/upload', requestHandlers.upload);

app.get('/project',function(req,res){
	res.render('start_dream', { title: '发起我的项目'});
});

app.get('/author_info',function(req,res){
	res.render('author_info', { title: '发起人信息'});
});

app.post('/author_info',requestHandlers.save_author_info_detail);

app.get('/author_info_detail',function(req,res){
	res.render('author_info_detail', { title: '个人信息'});
});

app.post('/author_info_detail',function(req,res){
res.render('author_info_detail', { title: '个人信息'});
});

app.get('/project-info',function(req,res){
	res.render('project_info', { title: '我的项目'});
});

app.post('/project-info',requestHandlers.project_info_save);

app.get('/project_returns',function(req, res){
var user_project_returns_info=req.session.user_project_returns_info;
if(user_project_returns_info){
	if(user_project_returns_info.length>0){
		console.log("user_project_returns_info.length===="+user_project_returns_info.length);
		console.log("user_project_returns_info===="+user_project_returns_info[0].price);
		res.render('project_returns', { title: 'project_returns',items:user_project_returns_info});
		}else{
			res.render('project_returns', { title: 'project_returns',items:null});
		}

}else{
	res.render('project_returns', { title: 'project_returns',items:null});

}
});

app.post('/project_returns',requestHandlers.project_returns_save);

app.get('/delete_user_project_returns_info',requestHandlers.delete_user_project_returns_info);

app.post('/checkUserAndPassword',requestHandlers.checkUserAndPassword);

app.get('/home',requestHandlers.checkLogin);
app.get('/home',function(req, res){
res.render('home', { title: 'Home'});
});


app.get("/settings-get_region",function(req,res){
	console.log("get=====settings-get_region");
});

app.post("/settings-get_region",function(req,res){
	console.log("post====settings-get_region");
});

app.get('/logout',requestHandlers.checkLogin);
app.get('/logout',requestHandlers.logout);

}
