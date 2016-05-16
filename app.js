//
// # Application
//
//
//
var express = require('express');
var path = require('path');


// ## SimpleServer
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
//var router = express();
//var server = http.createServer(router);
var app = module.exports = express();

app.use(express.static(path.resolve(__dirname, 'client')));

// ## REST-SERVICE
//
// define the versions
var VERSIONS = {'Pre-Production': '/v0' }; //, 'Version 1': '/v1'};

// define url and port to concat REST-URLs
var URL     = 'https://masterthesis-rpi-server-andre-lehnert.c9users.io',
    PORT    = 8080;

//console.log(process.env.IP);
//console.log(process.env.PORT);

app.set('_URL', URL);
app.set('_PORT', PORT);





// route to angular material prototype
app.get('/', function(req, res) {
    res.sendfile(__dirname + 'client/index.html');
})


// route to api browser
app.get('/api', function(req, res) {
    res.sendfile(__dirname + '/client/api-browser.html');
})

// route to display versions
app.get('/api/versions', function(req, res) {
    res.json(VERSIONS);
})

// versioned routes go in the routes/ directory
// import the routes
for (var k in VERSIONS) {
    // e.g. ./server/routes/rest-api/v0/api.js
    app.use('/api' + VERSIONS[k], require('./server/routes/rest-api' + VERSIONS[k] + '/rest-api'));
}



var server = app.listen(PORT, function () {
    console.log("Listening on port %s...", server.address().port);
});
