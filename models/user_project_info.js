var mongodb = require('./db');
var moment = require('moment');
function User_Project_Info(user_project_info) {
  this.name = user_project_info.name;//项目名称
  this.limit_price = user_project_info.limit_price;//筹集金额
  this.deal_days=user_project_info.deal_days;//筹集天数
  this.category = user_project_info.category;//筹集类别
  this.project_location = user_project_info.project_location;//项目地点
  this.pic_path=user_project_info.pic_path;
  this.city=user_project_info.city;//所在城市
  this.vedio_url=user_project_info.vedio_url;//项目视频地址
  this.project_brief=user_project_info.project_brief;//项目简介
  this.project_details=user_project_info.project_details;//项目详情 
  this.user_mobile= user_project_info.user_mobile;//项目发起者手机号码(这是唯一的主键)
  this.tags=user_project_info.tags;//项目标签
  this.time=moment(new Date()).format('YYYY-MM-DD');
};

module.exports = User_Project_Info;

//存储用户信息
User_Project_Info.prototype.save = function (callback) {
  //要存入数据库的用户文档
  var user_project_info = {
    name: this.name,
    limit_price: this.limit_price,
    deal_days:this.deal_days,
    category:this.category,
    pic_path:this.pic_path,
    project_location:this.project_location,
    city:this.city,
    vedio_url:this.vedio_url,
    project_brief:this.project_brief,
    project_details:this.project_details,
    user_mobile:this.user_mobile,
    tags:this.tags,
    time:this.time
  };
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err); //错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('user_project_info', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err); //错误，返回 err 信息
      }
      //将用户数据插入 users 集合
      collection.insert(user_project_info, {
        safe: true
      }, function (err, user_project_info) {
        mongodb.close();
        if (err) {
          return callback(err); //错误，返回 err 信息
        }
        console.log("写入数据库成功");
        callback(null, user_project_info); //成功！err 为 null，并返回存储后的用户文档
      });
    });
  });
};

//根据用户名获取用户信息
User_Project_Info.findUserProjectInfoByName = function(name, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('user_project_info', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      collection.findOne({
        name: name
      }, function (err, user_project_info) {
        mongodb.close();
        if (err) {
          return callback(err,null);//失败！返回 err 信息
        }
        callback(null, user_project_info);//成功！返回查询的用户信息
      });
    });
  });
};

//根据手机号码获取用户项目信息
User_Project_Info.findUserProjectInfoByquery = function(req,pagesize,page,mobile, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('user_project_info', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      //如果传入的参数page存在则进行分页查询
    if(page){
          collection.find({user_mobile:mobile}).sort({time: -1}).limit(pagesize).skip(pagesize*(page-1)).toArray(function(err, docs) {
          mongodb.close();
          if (err) {
          callback(err, null);
          }
          // 封裝 posts 爲 Post 對象
          var user_project_info_arr = [];
          docs.forEach(function(doc, index) {
          console.log("doc.name===="+doc.name);
          user_project_info_arr.push(doc);
          });
          callback(null, user_project_info_arr);
          });
          
      }else{
        //查询总数
            collection.count(function(err,count){ 
            total = count; 
            console.log("总共数量是===="+total);
            req.session.count=count;
            if(count==0){
              mongodb.close();
              err="没有查询到记录!";
               return callback(err, null);
            }
            collection.find({user_mobile:mobile}).sort({time: -1}).limit(pagesize).toArray(function(err, docs) {
            mongodb.close();
            if (err) {
            return callback(err, null);
            }
            // 封裝 posts 爲 Post 對象
            var user_project_info_arr = [];
            docs.forEach(function(doc, index) {
            console.log("doc.name===="+doc.name);
            user_project_info_arr.push(doc);
            });
            callback(null, user_project_info_arr);
            });

         });

          }

    });
  });
};

//根据分页查询项目信息
User_Project_Info.findUserProjectInfoByMobile = function(mobile, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('user_project_info', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      collection.find({user_mobile:mobile}).sort({time: -1}).toArray(function(err, docs) {
        mongodb.close();
        if (err) {
          callback(err, null);
        }
        // 封裝 posts 爲 Post 對象
        var user_project_info_arr = [];
        docs.forEach(function(doc, index) {
          console.log("doc.name===="+doc.name);
          user_project_info_arr.push(doc);
        });
        callback(null, user_project_info_arr);
      });
    });
  });
};

//根据项目名称删除项目信息
User_Project_Info.delete_project_info = function(req, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('user_project_info', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //通过data_id删除用户反馈信息
      collection.remove({
        user_mobile: req.session.user.mobile,
        name:req.query.name
      }, function (err, delete_result) {
        mongodb.close();
        if (err) {
          return callback(err,null);//失败！返回 err 信息
        }
        callback(null, delete_result);//成功！返回查询的用户信息
      });
    });
  });
};


//更新项目信息
User_Project_Info.prototype.update_project_info = function(req, callback) {
  //l相当于java里面的bean
    var user_project_info = {
    name: this.name,
    limit_price: this.limit_price,
    deal_days:this.deal_days,
    category:this.category,
    pic_path:this.pic_path,
    project_location:this.project_location,
    city:this.city,
    vedio_url:this.vedio_url,
    project_brief:this.project_brief,
    project_details:this.project_details,
    user_mobile:this.user_mobile,
    tags:this.tags,
    time:this.time
  };
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('user_project_info', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }


      console.log("user_project_info=========="+user_project_info.name);
      //查找用户名（name键）值为 name 一个文档
      collection.update({
        user_mobile: req.body.user_mobile,
        name:req.body.project_name
      },{$set:user_project_info}, function (err, result) {
        mongodb.close();
        if (err) {
          return callback(err,null);//失败！返回 err 信息
        }
        callback(null, result);//成功！返回查询的用户信息
      });
    });
  });
};
