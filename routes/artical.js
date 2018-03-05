var express = require('express');
var router = express.Router();
var URL = require('url');  
const articalDAO = require("../lib/articalDAO");
//获取所有文章
router.get('/getArticals', function(req, res, next) {
    articalDAO.articalShow(req, res, next);
});
//根据文章id获取文章
router.get('/getArticalById', function(req, res, next) {
    articalDAO.articalSearch(req, res, next);
});
//根据文章name获取文章
router.get('/getArticalByName', function(req, res, next) {
    articalDAO.articalSearch(req, res, next);
});
//发布文章
router.post('/publishArtical', function(req, res, next){
    articalDAO.articalAdd(req, res, next);
});
//根据文章id修改文章
router.post('/updateArticalById', function(req, res, next){
    articalDAO.articalUpdate(req, res, next);
});
//根据文章id删除文章
router.post('/deleteArticalById', function(req, res, next){
    articalDAO.articalDelete(req, res, next);
});
module.exports = router;
