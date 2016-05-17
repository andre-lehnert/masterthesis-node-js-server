var express = require('express');
var app = module.exports = express();

// ---------------- API --------------------------------------------------------
var API;

function getAPI() {
    updateApiStatus();
    return API;
}

function updateApiStatus() {

    var allDescription = 'Move all bars to :position [0-100] %',
        columnDescription = 'Move all bars in column :barchartColumn [A-J] to :position [0-100] %',
        rowDescription = 'Move all bars in row :barchartRow [1-10] to :position [0-100] %',
        barDescription = 'Move bar [A-J][1-10] to :position [0-100] %, e.g. "/A1/50", "/A3/0", "/B2/100", ...';

    //TODO
    //var columns = getAvailableColumns(),
    //    rows = getAvailableRows();


    var jsonResponse = {
        'version' : 0,
        'operation' : 'move',
        'urls' : [
            //TODO add real urls
            {
                'url' :  '/move/all/:position',
                'description' : allDescription,
                'params': [
                  {
                    'param': ':position',
                    'values': [0, 10, 25, 50, 75, 90, 100]
                  }
                ]
            },

            //
            {
                'url' :  '/move/A/:position',
                'description' : columnDescription,
                'params': [
                  {
                    'param': ':position',
                    'values': [0, 10, 25, 50, 75, 90, 100]
                  }
                ]
            },
            //
            {
                'url' :  '/move/A1/:position',
                'description' : barDescription,
                'params': [
                  {
                    'param': ':position',
                    'values': [0, 10, 25, 50, 75, 90, 100]
                  }
                ]
            },
            {
                'url' :  '/move/A2/:position',
                'description' : barDescription,
                'params': [
                  {
                    'param': ':position',
                    'values': [0, 10, 25, 50, 75, 90, 100]
                  }
                ]
            },
            {
                'url' :  '/move/A3/:position',
                'description' : barDescription,
                'params': [
                  {
                    'param': ':position',
                    'values': [0, 10, 25, 50, 75, 90, 100]
                  }
                ]
            },

            //
            {
                'url' :  '/move/1/:position',
                'description' : rowDescription,
                'params': [
                  {
                    'param': ':position',
                    'values': [0, 10, 25, 50, 75, 90, 100]
                  }
                ]
            },
            {
                'url' :  '/move/2/:position',
                'description' : rowDescription,
                'params': [
                  {
                    'param': ':position',
                    'values': [0, 10, 25, 50, 75, 90, 100]
                  }
                ]
            },
            {
                'url' :  '/move/3/:position',
                'description' : rowDescription,
                'params': [
                  {
                    'param': ':position',
                    'values': [0, 10, 25, 50, 75, 90, 100]
                  }
                ]
            },

        ]
     };

    API = jsonResponse;
}

getAPI() ;
app.set('_OPERATION_MOVE', API);

// ---------------- ROUTING ----------------------------------------------------

// shows API information
app.get('/', function(req, res) {
    getAvailableBars(req, res);
    console.log(getAPI());
});

app.get('/:barchartReceiver', function(req, res) {
    res.json({'barchartReceiver' : req.params.barchartReceiver});
});

app.get('/:barchartReceiver/:position', function(req, res) {
    moveTo(req, res);
});





function getAvailableBars(req, res) {
    updateApiStatus();
    res.json(API);
}


function moveTo(req, res) {

    var requestUrl                  = req.url,                      // "/all/100"
        barchartReceiver            = req.params.barchartReceiver,  // bar [A-J][1-10]
        targetPosition              = req.params.position,          // position [0-100] %

        // communication with arduino
        arduinoApiVersion           = 0,                            // used API version for I²C communication

        // computed params
        currentPosition             = 'unknown',                    // receive current bar position [0-100]
        movingDirection             = 'unknown',                    // acceleration [up, down, none]
        stepDifference              = 'unknown',                    // steps to reach target position
        movingTime                  = 'unknown',                    // steps * stepDelay (ms)

        // 1. Send request to arduino
        operationRequest            = 'unknown',
        operationRequestDateTime    = 'unknown',                    // 2016-05-08T13:03:45.502Z

        // 2. Arduino sends response
        operationResponse           = 'unknown',
        operationResponseDateTime   = 'unknown',                    // 2016-05-08T13:03:45.502Z

        // 3. Request status report
        statusRequest               = 'unknown',
        statusRequestDateTime       = 'unknown',                    // 2016-05-08T13:03:45.502Z

        // 4. Arduino sends status response
        statusResponse              = 'unknown',                    // status after operation
        statusResponseDateTime      = 'unknown',                    // 2016-05-08T13:03:45.502Z

        // Additional logging information
        timezoneOffset              = 'unknown';                    // If your time zone is GMT+2, -120 will be returned.


     timezoneOffset = new Date().getTimezoneOffset();


     var jsonResponse = {
         'barchartReceiver' : barchartReceiver,
         'target-position'  : targetPosition,
         'arduino-api'      : arduinoApiVersion,
         'timezone-offset'  : timezoneOffset,

     };

     res.json(jsonResponse);
}
