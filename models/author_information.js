var mongodb = require('./db');

function Author_Information(author_information) {
  this.ex_real_name = author_information.ex_real_name;//真是名字
  this.province = author_information.province;//省份
  this.city=author_information.city;//城市
  this.ex_contact = author_information.ex_contact;//移动电话
  this.bank_name = author_information.bank_name;//银行名称
  this.bank=author_information.bank;//开户支行
  this.bank_user_name=author_information.bank_user_name;//开户名称
  this.bank_card=author_information.bank_card;//银行账号
  this.user_mobile=author_information.user_mobile;
};

module.exports = Author_Information;

//存储用户回报内容信息
Author_Information.prototype.save = function (callback) {
  //要存入数据库的用户文档
  var author_information = {
    ex_real_name:  this.ex_real_name,
    province: this.province,
    city:this.city,
    ex_contact:this.ex_contact,
    bank_name:this.bank_name,
    bank:this.bank,
    bank_user_name:this.bank_user_name,
    bank_card:this.bank_card,
    user_mobile:this.user_mobile
  };
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err); //错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('author_information', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err); //错误，返回 err 信息
      }
      //将用户数据插入 users 集合
      collection.insert(author_information, {
        safe: true
      }, function (err, author_information) {
        mongodb.close();
        if (err) {
          return callback(err); //错误，返回 err 信息
        }
        console.log("写入数据库成功");
        callback(null, author_information); //成功！err 为 null，并返回存储后的用户文档
      });
    });
  });
};


//根据手机号码获取用户项目反馈信息
Author_Information.findAuthor_InformationByMobile = function(mobile, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('author_information', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      collection.findOne({
        ex_contact: mobile
      }, function (err, author_information) {
        mongodb.close();
        if (err) {
          return callback(err,null);//失败！返回 err 信息
        }
        callback(null, author_information);//成功！返回查询的用户信息
      });
    });
  });
};

//根据用户手机号删除用户银行帐号信息
Author_Information.delete_author_info = function(req, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('author_information', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //通过data_id删除用户反馈信息
      collection.remove({
        user_mobile: req.session.user.mobile
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