var request = require('request');

describe('brewster', function () {
    it('should be listening at localhost:3000', function (done) {
        request('http://localhost:3000/api/', function (error, response, body) {

            if (!response || response.statusCode !== 404) {
                throw new Error('Could not reach endpoint');
            }

            done();
        });
    });

    it('should list breweries by name search', function (done) {

        request('http://localhost:3000/api/breweries?name=vivant', function (error, response, body) {
            if (!response || response.statusCode !== 200) {
                throw new Error('Could not reach endpoint');
            }

            var json = JSON.parse(body);
            if (json.length != 1) {
                throw new Error('There can be only one!');
            }

            done();
        });
    });

    it('should list beers by brewery', function (done) {

      request('http://localhost:3000/api/beers?name=Brewery%20Vivant', function (error, response, body) {
            if (!response || response.statusCode !== 200) {
                throw new Error('Could not reach endpoint');
            }

            var json = JSON.parse(body);
            if (json.length === 0) {
                throw new Error('Sorry son you must have the wrong brewery');
            }

            done();
        });
    });
});
