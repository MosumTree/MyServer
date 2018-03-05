var mysql = require('mysql');
var $conf = require('../config/default');
var $articalsql = require('./articalSqlMapping');
// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);
// 向前台返回JSON方法的简单封装
var jsonWrite = function (res,ret) {
	if(typeof ret === 'undefined') {
		return res.json({
			ErrCode:'1',
			ErrMsg: '操作失败'
		});
	} else {
        var response = {Datas:ret, ErrCode:0, ErrMsg:'', TotalCount:ret.length};
		return res.send(response);
	}
};
let artical = {
    articalShow:function (req, res, next) {
        //获取所有的文章摘要信息
        pool.getConnection(function(err, connection) {
            // let param = req.query || req.param;
            connection.query($articalsql.queryAllArticals, function(err, result) {
                if (err) {
                    console.error("操作失败，原因：" + err)
                }
                else{
                    jsonWrite(res, result); 
                }
                connection.release();
            });
        });
    },
    articalSearch:function (req, res, next) {
        //获取所有的文章摘要信息
        pool.getConnection(function(err, connection) {
            let params = req.query || req.param;
            // var params = URL.parse(req.url, true).query;
            connection.query($articalsql.queryArticalById,[params.id], function(err, result) {
                if (err) {
                    console.error("操作失败，原因：" + err)
                }
                else{
                   jsonWrite(res, result); 
                }
                connection.release();
            });
        });
    },
    articalAdd:function (res, req, next) {
        
    },
    articalDelete:function(res, req, next){

    },
    articalUpdate:function(res, req, next){

    }
}
module.exports = artical;