var fs = require('fs');

module.exports = {
    "api": fs.existsSync('./config/api.json') ? JSON.parse(fs.readFileSync('./config/api.json')) : { url: "http://api.brewerydb.com/v2", key: ""}
};