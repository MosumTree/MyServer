var url = require('url');
var request = require('request');
var sha1 = require('sha1');
 
let config = {
        appID: "wx56145e16377a7c8d",// 微信公众号ID
        appSecret: "ccecb06f5e2e6db2e4fdb72e14f00216" //微信公众号里有
    },
    configEnd = {
        appID: '',
        access_token: '',
        ticket: '',
        timestamp: '', // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '', // 必填，签名，见附录1
    };
 
/**
 * 微信分享
 */
class wxShare {
    /**
     * 请求获取access_token 方法入口
     * @param {* URL链接} hrefURL 
     * @param {* 回调请求方法} callback 
     */
    accessToken(hrefURL, callback) { // 获取access_token
        let _this = this;
        var tokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + config.appID + '&secret=' + config.appSecret;
        request(tokenUrl, function(error, response, body) {
            if (response.statusCode && response.statusCode === 200) {
                body = JSON.parse(body);
                configEnd.access_token = body.access_token;
                _this.upJsapiTicket(hrefURL, body.access_token, callback)
            }
        });
    };
    /**
     * 获取Jsapi_Ticket
     * @param {* URL链接} hrefURL 
     * @param {* token} access_Ttoken 
     * @param {* 回调请求方法} callback 
     */
    upJsapiTicket(hrefURL, access_Ttoken, callback) { // Jsapi_ticket
        let _this = this;
        var ticketUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + access_Ttoken + '&type=jsapi';
        request(ticketUrl, function(err, response, content) {
            content = JSON.parse(content);
            if (content.errcode == 0) {
                configEnd.ticket = content.ticket; // ticket
                configEnd.timestamp = _this.createTimestamp(); // 时间戳
                configEnd.nonceStr = _this.createNonceStr(); // 随机数
                configEnd.signature = _this.sign(hrefURL); // 签名
                callback && callback(configEnd); // 回调前端JS方法
            }
        })
    };
    /**
     * 随机字符串
     */
    createNonceStr() {
        return Math.random().toString(36).substr(2, 15);
    };
    /**
     * 时间戳
     */
    createTimestamp() {
        return parseInt(new Date().getTime() / 1000).toString();
    };
    /**
     * 拼接字符串
     * @param {*} args 
     */
    rawString(args) {
        var keys = Object.keys(args);
        keys = keys.sort()
        var newArgs = {};
        keys.forEach(function(key) {
            newArgs[key.toLowerCase()] = args[key];
        });
        var string = '';
        for (var k in newArgs) {
            string += '&' + k + '=' + newArgs[k];
        }
        string = string.substr(1);
        return string;
    };
    /**
     * 签名
     * @param {*} url 
     */
    sign(url) {
        let _this = this;
        var ret = {
            jsapi_ticket: configEnd.ticket,
            nonceStr: configEnd.nonceStr,
            timestamp: configEnd.timestamp,
            url: url
        };
        var string = _this.rawString(ret);
        var shaObjs = sha1(string);
        return shaObjs;
    };
 
}
module.exports = wxShare;
