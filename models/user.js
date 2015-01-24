var mongodb = require('./db');
var moment = require('moment');
function User(user) {
  this.name = user.name;//用户名
  this.password = user.password;//密码
  this.mobile=user.mobile;//手机号
  this.gender=user.gender;//性别
  this.location=user.location;//所在地
  this.city=user.city;//所在城市
  this.description=user.description;//自我介绍
  this.head_portrait=user.head_portrait;//头像
  this.time=moment(new Date()).format('YYYY-MM-DD');
};

module.exports = User;

//存储用户信息
User.prototype.save = function (callback) {
  //要存入数据库的用户文档
  var user = {
    name: this.name,
    password: this.password,
    mobile:this.mobile,
    city:this.city,
    gender:this.gender,
    location:this.location,
    description:this.description,
    head_portrait:this.head_portrait,
    time:this.time
  };
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err); //错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err); //错误，返回 err 信息
      }
      //将用户数据插入 users 集合
      collection.insert(user, {
        safe: true
      }, function (err, user) {
        mongodb.close();
        if (err) {
          return callback(err); //错误，返回 err 信息
        }
        console.log("写入数据库成功");
        callback(null, user); //成功！err 为 null，并返回存储后的用户文档
      });
    });
  });
};

//根据用户名获取用户信息
User.findUserByName = function(name, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      collection.findOne({
        name: name
      }, function (err, user) {
        mongodb.close();
        if (err) {
          return callback(err,null);//失败！返回 err 信息
        }
        callback(null, user);//成功！返回查询的用户信息
      });
    });
  });
};

//根据手机号码获取用户信息
User.findUserByMobile = function(mobile, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      collection.findOne({
        mobile: mobile
      }, function (err, user) {
        mongodb.close();
        if (err) {
          return callback(err,null);//失败！返回 err 信息
        }
        callback(null, user);//成功！返回查询的用户信息
      });
    });
  });
};


//更新用户信息
User.updateUserByMobile = function(req, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      collection.update({
        mobile: req.body.mobile
      },{$set:{
        name:req.body.username,
        gender:req.body.genders,
        location:req.body.user_location,
        city:req.body.city,
        description:req.body.intro 
      }}, function (err, result) {
        mongodb.close();
        if (err) {
          return callback(err,null);//失败！返回 err 信息
        }
        callback(null, result);//成功！返回查询的用户信息
      });
    });
  });
};


//更新用户密码
User.updateUserPasswordByMobile = function(password,mobile, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //更新用户密码通过手机号
      collection.update({
        mobile:mobile
      },{$set:{
      password:password
      }}, function (err, result) {
        mongodb.close();
        if (err) {
          return callback(err,null);//失败！返回 err 信息
        }
        callback(null, result);//成功！返回查询的用户信息
      });
    });
  });
};

//更新用户头像
User.updateUserHeaderByMobile = function(req, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //更新用户密码通过手机号
      collection.update({
        mobile:req.body.mobile
      },{$set:{
      head_portrait:req.session.picture_url
      }}, function (err, result) {
        mongodb.close();
        if (err) {
          return callback(err,null);//失败！返回 err 信息
        }
        callback(null, result);//成功！返回查询的用户信息
      });
    });
  });
};