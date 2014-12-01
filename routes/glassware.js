var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config');

router.get('/', function (req, res) {
    request(config.api.url + '/glassware' + '?key=' + config.api.key, function (error, response, body) {
        var json = JSON.parse(body);
        res.send(json.data || []);
    });
});

router.get('/:glassId', function (req, res) {
    request(config.api.url + '/glass/' + req.params.glassId + '?key=' + config.api.key, function (error, response, body) {
        var json = JSON.parse(body);
        res.send(json.data || {});
    });
});

module.exports = router;