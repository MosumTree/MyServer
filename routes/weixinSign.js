const express = require('express');
const router = express.Router();
const wxShare = require('./wxShare');
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const request = require("request");
const sha1 = require('sha1');

const filePath = path.join(__dirname, "/data.json");


router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
/**
 * 分享
 */
router.post('/activityWxShare', function(req, res, next) {
    let hrefURL = req.body.urlhref;
    wxShare.prototype.accessToken(hrefURL, function(data) {
       return res.json(data);
    });
});
module.exports = router;