// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../config/default');
var $usersql = require('./userSqlMapping');
 
// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);
// 向前台返回JSON方法的简单封装
var jsonWrite = function (res,ret) {
	if(typeof ret === 'undefined') {
		return res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		 return res.json(ret);
	}
};
 
let User = {
	//创建表格
	create: function (req, res ,next) {
		var a;
		pool.getConnection(function (err, connection) {
			if (err) {
				console.log("建立连接失败",err);  
			}
			else{
				connection.query($usersql.create, function(err){
					if (err) {
						console.error("创建表格失败，失败原因：",err)
					}
					console.log("创建表格成功")
				})
				connection.release();
			}
		})
	},
	show: function(req, res, next){
		var a;
		pool.getConnection(function(err,connection) {  
			if(err) {  
				console.log("建立连接失败",err);  
			}else{  
				console.log("建立连接成功"); 
				console.log(pool._allConnections.length);//1   
				connection.query('select * from test.test_table',function(err,result) {  
					if(err) {  
						console.log("查询失败");  
					}else{   
						a = result; 
						console.log(a[0].No) 
					}  
					//connection.destroy();  
					console.log(pool._allConnections.length);//0      
				});
				//return res.json(a)
		     	setTimeout(()=>res.render('users',  {
					name: a[0].Usage
				}),10) ;   
			}  
			//pool.end();  
		}) 
	},
	add: function (user) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = user;
 
			// 建立连接，向表中插入值
			// 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
			connection.query($usersql.insert, [param.user_id, param.user_name, param.user_password, param.user_sex, param.user_avator, param.user_bio], function(err, result) {
				if (err) {
					console.error('添加失败,失败原因：',err)
					return false;
				}
				console.log('注册成功')
				
				// 以json形式，把操作结果返回给前台页面
				// jsonWrite(res, result)
				
				// 释放连接 
				connection.release();
				return true;
			});
		});
	},
	delete: function (req, res, next) {
		// delete by Id
		pool.getConnection(function(err, connection) {
			var id = +req.query.id;
			connection.query($sql.delete, id, function(err, result) {
				if(result.affectedRows > 0) {
					result = {
						code: 200,
						msg:'删除成功'
					};
				} else {
					result = void 0;
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	update: function (req, res, next) {
		// update by id
		// 为了简单，要求同时传name和age两个参数
		var param = req.body;
		if(param.name == null || param.age == null || param.id == null) {
			jsonWrite(res, undefined);
			return;
		}
 
		pool.getConnection(function(err, connection) {
			connection.query($sql.update, [param.name, param.age, +param.id], function(err, result) {
				// 使用页面进行跳转提示
				if(result.affectedRows > 0) {
					res.render('suc', {
						result: result
					}); // 第二个参数可以直接在jade中使用
				} else {
					res.render('fail',  {
						result: result
					});
				}
 
				connection.release();
			});
		});
 
	},
	queryById: function (req, res, next) {
		var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryById, id, function(err, result) {
				jsonWrite(res, result);
				connection.release();
 
			});
		});
	},
	queryAll: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryAll, function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	}
 
};
module.exports = User;