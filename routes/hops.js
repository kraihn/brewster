var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config');

router.get('/', function (req, res) {
    request(config.api.url + '/hops' + '?key=' + config.api.key, function (error, response, body) {
        var json = JSON.parse(body);
        res.send(json.data || []);
    });
});

router.get('/:hopId', function (req, res) {
    request(config.api.url + '/hop/' + req.params.hopId + '?key=' + config.api.key, function (error, response, body) {
        var json = JSON.parse(body);
        res.send(json.data || {});
    });
});

module.exports = router;