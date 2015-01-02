
/*
 *路由转发模块
 */
var requestHandlers=require('../models/requestHandlers');
var	TITLE = 'insupper';
module.exports=function(app){

app.get('/',function(req, res){
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

//上传图片
app.post('/upload', requestHandlers.upload);

app.get('/project',function(req,res){
	res.render('start_dream', { title: '发起我的项目'});
});


app.get('/project-info',function(req,res){
	res.render('project_info', { title: '我的项目'});
});

app.post('/project-info',function(req,res){
	res.render('project_info', { title: '我的项目'});
});

app.post('/project_info_save',requestHandlers.project_info_save);


app.get('/project_returns',function(req, res){
res.render('project_returns', { title: 'project_returns'});
});


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
