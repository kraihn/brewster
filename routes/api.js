var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config');

router.get('/breweries', function(req, res) {
    var name = req.param('name');
    request('http://api.brewerydb.com/v2/breweries?name=*' + name + '*&key=' + config.api.key, function (error, response, body) {
        var json = JSON.parse(body);

        if (!json.data) {
            return res.send(400, 'No breweries found');
        }

        var breweries = [];

        for (var i = 0; i < json.data.length; i++) {
            breweries.push(json.data[i].name);
        }

        res.send(breweries);
    });
});

router.get('/beers', function(req, res) {
    var name = req.param('name');
    request('http://api.brewerydb.com/v2/breweries?name=' + name + '&key=' + config.api.key, function (error, response, body) {
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

module.exports = router;
