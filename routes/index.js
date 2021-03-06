
/*
 *路由转发模块
 */
var requestHandlers=require('../models/requestHandlers');
var Paginate=require('../util/Paginate')
var	TITLE = 'insupper';
module.exports=function(app){

app.get('/',function(req,res){
	var all_user_project_info_arr=req.session.all_user_project_info_arr;
	var num=req.session.flag;
	console.log("all_user_project_info_arr=========="+all_user_project_info_arr);
	var paginate= req.session.index_paginate;
	var index_arr=req.session.index_arr;
	if(all_user_project_info_arr){
		console.log("req.session.project_total===="+req.session.project_total);		
		if(!paginate){
			var paginate=new Paginate(1,10,req.session.project_total);
			req.session.index_paginate=paginate;
			console.log("next===="+paginate.next());
			console.log("pagesize===="+paginate.pagesize);        
			console.log("maxpage===="+paginate.maxpage);
			console.log("page===="+paginate.page);
			console.log("total===="+paginate.total);
			index_arr=new Array()

			if(paginate.maxpage>=1){
			for(var i=1;i<=paginate.maxpage;i++){
               index_arr.push(i);
          	}
          }	
          req.session.index_arr=index_arr;
		}
    console.log("nextPage===="+paginate.nextPage);
	res.render('index', { title: '众酬网-中国最具知名度的众酬平台',items:all_user_project_info_arr,pageitems:index_arr,action_flag:req.query.action_flag });	
}else{
      requestHandlers.findAllUserProject(req,res);
}

});

app.get('/all_user_project_info_query',function(req,res){
	var paginate =req.session.index_paginate;
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
      		req.query.action_flag="index";
		return res.redirect('/');
    }else{
        paginate.page = page;
    }
     if(page > paginate.maxpage){
      		req.query.action_flag="index";
		return res.redirect('/');
    }else{
    	if(page==paginate.maxpage){
    		paginate.nextPage=page;
    	}else{
    		 paginate.nextPage= (parseInt(page)+1);
    	}

    }
	if(page <1){
			req.query.action_flag="index";
		return res.redirect('/');
	}
	else{
		if(page==1){
			paginate.prePage=page;
		}else{
			paginate.prePage= page-1;
		}

	}
     req.session.index_paginate=paginate ;
     requestHandlers.findAllUserProject(req,res);
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
	console.log("req.query.flag===="+req.query.flag);
	console.log("req.session.update_project_flag==="+req.session.update_project_flag)
	console.log("req.session.user_project_info===="+req.session.user_project_info);
    if(req.query.flag=='edit'){
    	if(req.session.user_project_info){
			if(req.session.user_project_info._id==req.query.id){
			res.render('edit_project_info', { title: '我的项目',action_flag:"start_project",edit_project_info_flag:req.session.user_project_info});	
			}else{
			requestHandlers.query_unpublish_project_by_id(req,res);
			}
    	}else{
             requestHandlers.query_unpublish_project_by_id(req,res);
            }

	}else if(req.session.update_project_flag=='edit'){
		 req.session.update_project_flag=null;
		 res.render('edit_project_info', { title: '我的项目',action_flag:"start_project",edit_project_info_flag:req.session.user_project_info});	
			
	}else if(req.session.update_project_flag=='error'){
		req.session.update_project_flag=null;
		res.render('project_info', { title: '我的项目',action_flag:"start_project"});
	}else{
		res.render('project_info', { title: '我的项目',action_flag:"start_project"});
	}


});
app.post('/project-info',function(req,res){
	if(req.body.update=='update'){
		console.log("update project");
		requestHandlers.project_info_update(req,res);
	}else{
		requestHandlers.project_info_save(req,res);
	}
});


app.get('/delete_project',requestHandlers.delete_project);



app.get('/project_returns',function(req, res){
var user_project_returns_info=req.session.user_project_returns_info_arr;
if(user_project_returns_info){
	if(user_project_returns_info.length>0){
		console.log("user_project_returns_info.length===="+user_project_returns_info.length);
		console.log("user_project_returns_info===="+user_project_returns_info[0].price);
		res.render('project_returns', { title: 'project_returns',items:user_project_returns_info,action_flag:"start_project"});
		}else{
			res.render('project_returns', { title: 'project_returns',items:null,action_flag:"start_project"});
		}

}else{
	//查询数据库
	requestHandlers.query_project_returns(req,res);
	//res.render('project_returns', { title: 'project_returns',items:null,action_flag:"start_project"});

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
	if(req.query.user_admin_flag){
	req.session.user_admin_flag=req.query.user_admin_flag;	
	}
	
	if(req.session.user_admin_flag=='unpublic_project_list'){
    var project_info_arr=req.session.unpublish_project_info_arr;
	var num=req.session.flag;
	console.log("project_info_arr=========="+project_info_arr);
	var paginate= req.session.unpublish_paginate;
	var arr=req.session.arr;
	if(project_info_arr){
		console.log("req.session.count===="+req.session.count);		
		if(!paginate){
			var paginate=new Paginate(1,2,req.session.count);
			req.session.unpublish_paginate=paginate;
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
	res.render('user_admin', { title: '项目信息',items:project_info_arr,pageitems:arr,user_admin_flag:req.session.user_admin_flag,action_flag:""});	
	}else{
	requestHandlers.query_unpublish_project(req,res);
	}

	}else if(req.session.user_admin_flag=='shipping_management'){
	res.render('user_admin', { title: '个人后台管理',user_admin_flag:req.query.user_admin_flag});
	}else if(req.session.user_admin_flag=='project_list'){
	res.render('user_admin', { title: '个人后台管理',user_admin_flag:req.query.user_admin_flag});
	}else{
		res.render('user_admin', { title: '个人后台管理',user_admin_flag:req.query.user_admin_flag});
	}

});



app.get('/public_project_query',function(req,res){
	var paginate =req.session.unpublish_paginate;
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
       return res.redirect('/user_admin');
    }else{
        paginate.page = page;
    }
     if(page > paginate.maxpage){
       return res.redirect('/user_admin');
    }else{
    	if(page==paginate.maxpage){
    		paginate.nextPage=page;
    	}else{
    		 paginate.nextPage= (parseInt(page)+1);
    	}

    }
	if(page <1){
	return res.redirect('/user_admin');
	}
	else{
		if(page==1){
			paginate.prePage=page;
		}else{
			paginate.prePage= page-1;
		}

	}
     req.session.unpublish_paginate=paginate ;
     requestHandlers.query_unpublish_project(req,res);
});



app.post('/start_project',function(req,res){
 res.render('project_info', { title: '我的项目',action_flag:req.body.action_flag});
});


app.get('/project_details',function(req,res){
var user_project_info=req.session.project_info;
if(req.query.id){
	if(user_project_info){
	if(user_project_info._id==req.query.id){
      res.render('project_details', { title: '众酬网-中国最具知名度的众酬平台',project_info:user_project_info,action_flag:"browse"});
	}else{
		console.log("开始进行查询数据库操作");
		requestHandlers.query_project_by_id(req,res);
	}
}else{
	console.log("开始进行查询数据库操作");
	requestHandlers.query_project_by_id(req,res);
}
}else{
	if(user_project_info){
	console.log("user_project_info._id==="+user_project_info._id);
	console.log("req.session.id=====)"+req.session.id_flag);

	if(user_project_info._id==req.session.id_flag){
      res.render('project_details', { title: '众酬网-中国最具知名度的众酬平台',project_info:user_project_info,action_flag:"browse"});
	}else{
		console.log("开始进行查询数据库操作");
		requestHandlers.query_project_by_id(req,res);
	}
}else{
	console.log("开始进行查询数据库操作");
	requestHandlers.query_project_by_id(req,res);
}
}


});

app.get('/help_term',function(req,res){
 res.render('help_term', { title: '众酬协议',help_flag:req.query.help_flag,action_flag:""});
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
