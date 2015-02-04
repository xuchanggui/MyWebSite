var mongodb = require('./db');

function User_Project_Returns_Info(user_project_returns_info) {
  this.price = user_project_returns_info.price;//回报金额
  this.description = user_project_returns_info.description;//回报内容描述
  this.image_file=user_project_returns_info.image_file;//图片文件
  this.limit_num = user_project_returns_info.limit_num;//限定名额
  this.delivery_fee = user_project_returns_info.delivery_fee;//运费
  this.repaid_day=user_project_returns_info.repaid_day;//回报时间
  this.return_type=user_project_returns_info.return_type;//回报类型
  this.user_mobile=user_project_returns_info.user_mobile;//用户手机号码
  this.data_id=user_project_returns_info.data_id;//预留id
  this.project_name=user_project_returns_info.project_name;
};

module.exports = User_Project_Returns_Info;

//存储用户回报内容信息
User_Project_Returns_Info.prototype.save = function (callback) {
  //要存入数据库的用户文档
  var user_project_returns_info = {
    price: this.price,
    description: this.description,
    image_file:this.image_file,
    limit_num:this.limit_num,
    delivery_fee:this.delivery_fee,
    repaid_day:this.repaid_day,
    return_type:this.return_type,
    user_mobile:this.user_mobile,
    data_id:this.data_id,
    project_name:this.project_name
  };
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err); //错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('user_project_returns_info', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err); //错误，返回 err 信息
      }
      //将用户数据插入 users 集合
      collection.insert(user_project_returns_info, {
        safe: true
      }, function (err, user_project_returns_info) {
        mongodb.close();
        if (err) {
          return callback(err); //错误，返回 err 信息
        }
        console.log("写入数据库成功");
        callback(null, user_project_returns_info); //成功！err 为 null，并返回存储后的用户文档
      });
    });
  });
};


//根据手机号码获取用户项目反馈信息
User_Project_Returns_Info.findUserProjectReturnsInfoByMobile = function(mobile, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('user_project_returns_info', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      collection.findOne({
        user_mobile: mobile
      }, function (err, user_project_returns_info) {
        mongodb.close();
        if (err) {
          return callback(err,null);//失败！返回 err 信息
        }
        callback(null, user_project_returns_info);//成功！返回查询的用户信息
      });
    });
  });
};

//根据data-id删除用户项目反馈信息
User_Project_Returns_Info.deleteUserProjectReturnsInfoByData_id = function(data_id,name, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('user_project_returns_info', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //通过data_id删除用户反馈信息
      collection.remove({
        data_id: data_id,
        project_name:name
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

//根据用户手机号删除用户项目反馈信息
User_Project_Returns_Info.deleteUserProjectReturnsInfoByMobile = function(mobile,name, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('user_project_returns_info', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //通过data_id删除用户反馈信息
      collection.remove({
        user_mobile: mobile,
        project_name:name
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


//根据手机号码获取用户项目信息
User_Project_Returns_Info.find_project_returns_info = function(user_mobile,project_name, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('user_project_returns_info', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      //如果传入的参数page存在则进行分页查询
          collection.find({user_mobile:user_mobile,project_name:project_name}).toArray(function(err, docs) {
          mongodb.close();
          if (err) {
          callback(err, null);
          }
          // 封裝 posts 爲 Post 對象
          var user_project_returns_info_arr = [];
          docs.forEach(function(doc, index) {
          user_project_returns_info_arr.push(doc);
          });
          callback(null, user_project_returns_info_arr);
          });
    });
  });
};