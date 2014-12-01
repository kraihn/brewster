var fs = require('fs');

module.exports = {
    "api": fs.existsSync('./config/api.json') ? JSON.parse(fs.readFileSync('./config/api.json')) : {key: ""}
};