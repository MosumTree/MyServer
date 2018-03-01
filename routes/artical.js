var express = require('express');
var router = express.Router();
var URL = require('url');  
router.get('./',function (req, res, next) {
    // res.send('user api');
})
router.get('/getArticals', function(req, res, next) {

    var user = {};
    var params = URL.parse(req.url, true).query;
  
    if(params.id == '1') {

        user.name = "ligh";
        user.age = "1";
        user.city = "北京市";

    }else{  
        user.name = "SPTING";
        user.age = "1";
        user.city = "杭州市";
    }

  var response = {status:1,data:user};
  res.send(JSON.stringify(response));

});
module.exports = router;
