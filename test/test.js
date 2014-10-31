var request = require('request');

describe('brewster', function () {
    it('should be listening at localhost:3000', function () {

        request('http://localhost:3000/', function (error, response, body) {
            if (response.statusCode !== 404) {
                throw new Error('You are incorrect sir');
            }
        });
     });

    it('should list breweries by name search', function () {

      request('http://localhost:3000/breweries?name=vivant', function (error, response, body) {
          if (response.statusCode !== 200) {
              throw new Error('You are incorrect sir');
          }

          var json = JSON.parse(body);
          if (json.length != 1) {
              throw new Error('There can be only one!');
          }
      });
    });

    it('should list beers by brewery', function () {

      request('http://localhost:3000/beers?name=Brewery%20Vivant', function (error, response, body) {
          if (response.statusCode !== 200) {
              throw new Error('You are incorrect sir');
          }

          var json = JSON.parse(body);
          if (json.length === 0) {
              throw new Error('Sorry son you must have the wrong brewery');
          }
      });
    });
});
