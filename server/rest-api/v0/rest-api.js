// # Version 0
//
var express = require('express');
var _move = require('./operations/move')
//var customAuth = require('../lib/customAuth')


var app = module.exports = express();

// middleware that only applies to this version of the API
//app.use(customAuth());

// ---------------- VERSION ----------------------------------------------------

var version    = 0, // v0
    author          = 'Andre Lehnert',
    title           = 'REST-API to control a physical 3D barchart over I²C';



// ---------------- ROUTING ----------------------------------------------------

// shows API information
app.get('/', function(req, res) {

    var API =
    {
        'description': title,
        'version': version,
        'author': author,
        'api' : urlOperations,
        'api-description': {
            '/': 'Shows API information',
            '/[operation]': {
                '/move' : barchartReceiverMoveOperation,
                '/status' : barchartReceiverStatusOperation, //TODO
                '/position': barchartReceiverPositionOperation, //TODO
                '/lighting': barchartReceiverLightingOperation,
                '/update': barchartReceiverUpdateOperation,
            }
        }
    };


    res.json(API);
})

// ## OPERATION
var OPERATIONS =
{
    'move': '/move',
    'status' : '/status',
    'position': '/position',
    'lighting': '/lighting',
    'update': '/update'
};

var urlOperations = [];



// enable routing to operation middleware
for (var k in OPERATIONS) {
    // e.g. ./server/routes/rest-api/v0/operations/move.js
    app.use(OPERATIONS[k], require('./operations' + OPERATIONS[k]));
    urlOperations.push(OPERATIONS[k]);
}

// ---------------- API DEFINITION ---------------------------------------------

var barchartReceiverMoveOperation =
{
    '/[barchart receiver]' : {
        '/all/:position' : 'Move all bars to :position [0-100] %',
        '/:barchartColumn/:position' : 'Move all bars in column :barchartColumn [A-J] to :position [0-100] %',
        '/:barchartRow/:position' : 'Move all bars in row :barchartRow [1-10] to :position [0-100] %',
        '/:bar/:position' : 'Move bar [A-J][1-10] to :position [0-100] %, e.g. "/A1/50", "/A3/0", "/B2/100", ...'
    }
};

var statusExample =
{
    'position' : 100,
    'steps' : 15000,
    'heatbeat-interval' : 1000
};

var barchartReceiverStatusOperation =
{
    '/[barchart receiver]' : {
        '/all' : 'Returns status information of all bars',
        '/:barchartColumn' : 'Returns status information of  column :barchartColumn [A-J], e.g. "{ "A" : { "1" : '+ JSON.stringify(statusExample) +', "2" : '+ JSON.stringify(statusExample) +', "3" : '+ JSON.stringify(statusExample) +'}}"',
        '/:barchartRow' : 'Returns status information of  row :barchartRow [1-10], e.g. "{ "1" : { "A" : '+ JSON.stringify(statusExample) +', "B" : '+ JSON.stringify(statusExample) +', "C" : '+ JSON.stringify(statusExample) +'}}"',
        '/:bar' : 'Returns status information of  [A-J][1-10], e.g. "{ "A1" : '+ JSON.stringify(statusExample) +'}"'
    }
};
var barchartReceiverPositionOperation =
{
    '/[barchart receiver]' : {
        '/all' : 'Returns postion of all bars',
        '/:barchartColumn' : 'Returns postion of column :barchartColumn [A-J], e.g. "{ "A" : { "1" : 0, "2" : 10, "3" : 100}}"',
        '/:barchartRow' : 'Returns postion of row :barchartRow [1-10], e.g. "{ "1" : { "A" : 0, "B" : 10, "C" : 100}}"',
        '/:bar' : 'Returns postion of [A-J][1-10], e.g. "{ "A1" : 100}"'
    }
};

var barchartReceiverLightingOperation =
{
    '/[barchart receiver]' : {
        '/all' : 'Turns the LED lighting/ animation for all bars',
        '/:barchartColumn' : 'Turns the LED lighting/ animation of column :barchartColumn [A-J], e.g. "{ "A" : { "1" : 0, "2" : 10, "3" : 100}}"',
        '/:barchartRow' : 'Turns the LED lighting/ animation of row :barchartRow [1-10], e.g. "{ "1" : { "A" : 0, "B" : 10, "C" : 100}}"',
        '/:bar' : 'Turns the LED lighting/ animation of [A-J][1-10], e.g. "{ "A1" : 100}"'
    }
};

var barchartReceiverUpdateOperation =
{
    '/[barchart receiver]' : {
        '/all' : 'Combination of /move and /lighting functions for all bars',
        '/:barchartColumn' : 'Combination of /move and /lighting functions column :barchartColumn [A-J], e.g. "{ "A" : { "1" : 0, "2" : 10, "3" : 100}}"',
        '/:barchartRow' : 'Combination of /move and /lighting functions row :barchartRow [1-10], e.g. "{ "1" : { "A" : 0, "B" : 10, "C" : 100}}"',
        '/:bar' : 'Combination of /move and /lighting functions of [A-J][1-10], e.g. "{ "A1" : 100}"'
    }
};
