
/*
 *路由转发模块
 */
var requestHandlers=require('../models/requestHandlers');
var Paginate=require('../util/Paginate')
var	TITLE = 'insupper';
module.exports=function(app){

app.get('/',function(req, res){
res.render('index', { title: 'Express',action_flag:req.query.action_flag });
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
	res.render('start_dream', { title: '发起我的项目',action_flag:"start_project"});
});

app.get('/author_info',requestHandlers.checkLogin);
app.get('/author_info',function(req,res){
	res.render('author_info', { title: '发起人信息',action_flag:"start_project"});
});
app.post('/author_info',requestHandlers.save_author_info_detail);


app.get('/project_success',function(req,res){
	res.render('project_success', { title: '众酬网-中国最具知名度的众酬平台',action_flag:"start_project"});
});
app.post('/project_success',function(req,res){
	res.render('project_success', { title: '众酬网-中国最具知名度的众酬平台',action_flag:"start_project"});
});

app.get('/user_settings',requestHandlers.checkLogin);
app.get('/user_settings',function(req,res){
	res.render('user_settings', { title: '众酬网-中国最具知名度的众酬平台',flag:req.query.seting_flag,action_flag:""});
});
app.post('/user_settings',requestHandlers.user_settings_save);


app.post('/checkPasswordIsExist',requestHandlers.check_pwd_is_exist);
app.post('/update_password',requestHandlers.update_user_password);



app.get('/author_info_detail',function(req,res){
	var project_info_arr=req.session.project_info_arr;
	var num=req.session.flag;
	console.log("project_info_arr=========="+project_info_arr);
	var paginate= req.session.paginate;
	var arr=req.session.arr;
	if(project_info_arr){
		console.log("req.session.count===="+req.session.count);		
		if(!paginate){
			var paginate=new Paginate(1,2,req.session.count);
			req.session.paginate=paginate;
			console.log("next===="+paginate.next());
			console.log("pagesize===="+paginate.pagesize);        
			console.log("maxpage===="+paginate.maxpage);
			console.log("page===="+paginate.page);
			console.log("total===="+paginate.total);
			arr=new Array()

			if(paginate.maxpage>=1){
			for(var i=1;i<=paginate.maxpage;i++){
               arr.push(i);
          	}
          }	
          req.session.arr=arr;
		}
     console.log("nextPage===="+paginate.nextPage);
	res.render('author_info_detail', { title: '项目信息',items:project_info_arr,pageitems:arr,action_flag:""});	
}else{
      requestHandlers.findUserProject(req,res);
}
});
app.post('/author_info_detail',function(req,res){
res.render('author_info_detail', { title: '个人信息'});
});


app.get('/author_info_detail_query',function(req,res){
	var paginate =req.session.paginate;
	var flag=req.query.flag;
	console.log("paginate.maxpage==="+paginate.maxpage);
	var page=req.query.page;
	if(page=="next"){
	if(paginate.page>=paginate.maxpage){
	paginate.page=paginate.maxpage;
	page=paginate.page;
	flag=paginate.page;
	}else{
	paginate.page=paginate.nextPage;
	console.log("下一页的页数是==="+paginate.page);
	page=paginate.page;
	flag=paginate.page;
	}
	}

	if(page=="pre"){
	if(paginate.page<=1){
	paginate.page=1;
	page=paginate.page;
	flag=paginate.page;
	}else{
	paginate.page=paginate.prePage;
	console.log("上一页的页数是==="+paginate.page);
	page=paginate.page;
	flag=paginate.page;
	}
	}

	req.session.flag=flag;
	console.log("req.query.page==="+page);
	console.log("req.query.flag==="+flag);
    //var pages=new Paginate(page,2,req.session.project_info_arr.length);

     if(page>paginate.maxpage){
       return res.redirect('/author_info_detail');
    }else{
        paginate.page = page;
    }
     if(page > paginate.maxpage){
       return res.redirect('/author_info_detail');
    }else{
    	if(page==paginate.maxpage){
    		paginate.nextPage=page;
    	}else{
    		 paginate.nextPage= (parseInt(page)+1);
    	}

    }
	if(page <1){
	return res.redirect('/author_info_detail');
	}
	else{
		if(page==1){
			paginate.prePage=page;
		}else{
			paginate.prePage= page-1;
		}

	}
     req.session.paginate=paginate ;
     requestHandlers.findUserProject(req,res);
});


app.get('/project-info',function(req,res){
	res.render('project_info', { title: '我的项目',action_flag:"start_project"});
});
app.post('/project-info',requestHandlers.project_info_save);


app.get('/project_returns',function(req, res){
var user_project_returns_info=req.session.user_project_returns_info;
if(user_project_returns_info){
	if(user_project_returns_info.length>0){
		console.log("user_project_returns_info.length===="+user_project_returns_info.length);
		console.log("user_project_returns_info===="+user_project_returns_info[0].price);
		res.render('project_returns', { title: 'project_returns',items:user_project_returns_info,action_flag:"start_project"});
		}else{
			res.render('project_returns', { title: 'project_returns',items:null,action_flag:"start_project"});
		}

}else{
	res.render('project_returns', { title: 'project_returns',items:null,action_flag:"start_project"});

}
});
app.post('/project_returns',requestHandlers.project_returns_save);



app.post('/upload_header',requestHandlers.upload_header);



app.get('/delete_user_project_returns_info',requestHandlers.delete_user_project_returns_info);

app.post('/checkUserAndPassword',requestHandlers.checkUserAndPassword);


app.get('/message',function(req,res){
	res.render('message', { title: '消息中心',message_flag:req.query.message_flag,action_flag:""});
});

app.get('/user_admin',function(req,res){
	res.render('user_admin', { title: '个人后台管理',user_admin_flag:req.query.user_admin_flag});
});


app.post('/start_project',function(req,res){
 res.render('project_info', { title: '我的项目',action_flag:req.body.action_flag});
});


app.get('/help_term',function(req,res){
 res.render('help_term', { title: '众酬协议',help_flag:req.query.help_flag});
});


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
