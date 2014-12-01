var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config');

router.get('/breweries', function (req, res) {
    var name = req.param('name');
    request(config.api.url + '/breweries?name=*' + name + '*&key=' + config.api.key, function (error, response, body) {
        var json = JSON.parse(body);

        if (!json.data) {
            return res.send(400, 'No breweries found');
        }

        var breweries = [];

        for (var i = 0; i < json.data.length; i++) {
            breweries.push({id: json.data[i].id, name: json.data[i].name});
        }

        res.send(breweries);
    });
});

router.get('/breweries/:breweryId', function (req, res) {
    request(config.api.url + '/brewery/' + req.params.breweryId + '?&key=' + config.api.key, function (error, response, body) {
        var json = JSON.parse(body);
        res.send(json.data || {});
    });
});

router.get('/breweries/:breweryId/beers', function (req, res) {
    request(config.api.url + '/brewery/' + req.params.breweryId + '/beers?&key=' + config.api.key, function (error, response, body) {
        var json = JSON.parse(body);
        res.send(json.data || []);
    });
});

router.get('/beers', function (req, res) {
    var name = req.param('name');
    request(config.api.url + '/breweries?name=' + name + '&key=' + config.api.key, function (error, response, body) {
        var json = JSON.parse(body);

        if (!json.data || json.data.length === 0) {
            return res.send(400, 'Invalid brewery');
        }

        var breweryId = json.data[0].id;

        request('http://api.brewerydb.com/v2/brewery/' + breweryId + '/beers?&key=' + config.api.key, function (error, response, body) {
            var beers = [];

            json = JSON.parse(body);

            for (var i = 0; i < json.data.length; i++) {
                beers.push(json.data[i].name);
            }

            res.send(beers);
        });
    });
});

router.get('/beers/:beerId', function (req, res) {
    request(config.api.url + '/beer/' + req.params.beerId + '?&key=' + config.api.key, function (error, response, body) {
        var json = JSON.parse(body);
        res.send(json.data || {});
    });
});

module.exports = router;
