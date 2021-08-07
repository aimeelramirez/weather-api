const fs = require('fs');

const options = {
    key: fs.readFileSync('./tmp/key.pem'),
    cert: fs.readFileSync('./tmp/cert.pem')
};


module.exports = options