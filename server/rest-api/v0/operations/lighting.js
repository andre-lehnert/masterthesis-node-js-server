var express = require('express');
var app = module.exports = express();

// ---------------- API --------------------------------------------------------
var API;

function getAPI() {
    updateApiStatus();
    return API;
}

function updateApiStatus() {

    var allDescription = 'Turns the LED lighting/ animation for all bars to :animation, :color [#FFFFFF], :brightness [0-100] % (opt, default = 100) and animation :speed [0-100] % (opt, default = 100)',
        columnDescription = 'Turns the LED lighting/ animation for all bars in column :barchartColumn [A-J] to :animation, :color [#FFFFFF], :brightness [0-100] % (opt, default = 100) and animation :speed [0-100] % (opt, default = 100)',
        rowDescription = 'Turns the LED lighting/ animation for all bars in row :barchartRow [1-10] to :animation, :color [#FFFFFF], :brightness [0-100] % (opt, default = 100) and animation :speed [0-100] % (opt, default = 100)',
        barDescription = 'Turns the LED lighting/ animation for bar [A-J][1-10] to :animation, :color [#FFFFFF], :brightness [0-100] % (opt, default = 100) and animation :speed [0-100] % (opt, default = 100)';

   var animations = [
     'switch-on',
     'switch-off', 'disable',
     'blink',
     'fade',
     'glow',
     'shift-up', 'shift-down',
     'moving-bars',
     'comet',
     'bouncing',
     'bubbles'
   ];

    //TODO
    //var columns = getAvailableColumns(),
    //    rows = getAvailableRows();


    var jsonResponse = {
        'version' : 0,
        'operation' : 'lighting',
        'urls' : [
            //TODO add real urls
            {
                'url' :  '/lighting/all/:animation/:color/:brightness/:speed',
                'description' : allDescription,
                'params': [
                  {
                    'param': ':animation',
                    'values': animations
                  },
                  {
                    'param': ':color',
                    'values': ['0000FF', '00FF00', 'FF0000', 'FFFFFF']
                  },
                  {
                    'param': ':brightness',
                    'values': [10, 25, 50, 75, 90, 100]
                  },
                  {
                    'param': ':speed',
                    'values': [0, 10, 25, 50, 75, 90, 100]
                  }
                ]
            },

            //
            {
                'url' :  '/lighting/A/:animation/:color/:brightness/:speed',
                'description' : columnDescription,
                'params': [
                  {
                    'param': ':animation',
                    'values': animations
                  },
                  {
                    'param': ':color',
                    'values': ['000000', '0000FF', '00FF00', 'FF0000', 'FFFFFF']
                  },
                  {
                    'param': ':brightness',
                    'values': [10, 25, 50, 75, 90, 100]
                  },
                  {
                    'param': ':speed',
                    'values': [0, 10, 25, 50, 75, 90, 100]
                  }
                ]
            },
            //
            {
                'url' :  '/lighting/A1/:animation/:color/:brightness/:speed',
                'description' : barDescription,
                'params': [
                  {
                    'param': ':animation',
                    'values': animations
                  },
                  {
                    'param': ':color',
                    'values': ['000000', '0000FF', '00FF00', 'FF0000', 'FFFFFF']
                  },
                  {
                    'param': ':brightness',
                    'values': [10, 25, 50, 75, 90, 100]
                  },
                  {
                    'param': ':speed',
                    'values': [0, 10, 25, 50, 75, 90, 100]
                  }
                ]
            },
            {
                'url' :  '/lighting/A2/:animation/:color/:brightness/:speed',
                'description' : barDescription,
                'params': [
                  {
                    'param': ':animation',
                    'values': animations
                  },
                  {
                    'param': ':color',
                    'values': ['000000', '0000FF', '00FF00', 'FF0000', 'FFFFFF']
                  },
                  {
                    'param': ':brightness',
                    'values': [10, 25, 50, 75, 90, 100]
                  },
                  {
                    'param': ':speed',
                    'values': [0, 10, 25, 50, 75, 90, 100]
                  }
                ]
            },
            {
                'url' :  '/lighting/A3/:animation/:color/:brightness/:speed',
                'description' : barDescription,
                'params': [
                  {
                    'param': ':animation',
                    'values': animations
                  },
                  {
                    'param': ':color',
                    'values': ['000000', '0000FF', '00FF00', 'FF0000', 'FFFFFF']
                  },
                  {
                    'param': ':brightness',
                    'values': [10, 25, 50, 75, 90, 100]
                  },
                  {
                    'param': ':speed',
                    'values': [0, 10, 25, 50, 75, 90, 100]
                  }
                ]
            },

            //
            {
                'url' :  '/lighting/1/:animation/:color/:brightness/:speed',
                'description' : rowDescription,
                'params': [
                  {
                    'param': ':animation',
                    'values': animations
                  },
                  {
                    'param': ':color',
                    'values': ['000000', '0000FF', '00FF00', 'FF0000', 'FFFFFF']
                  },
                  {
                    'param': ':brightness',
                    'values': [10, 25, 50, 75, 90, 100]
                  },
                  {
                    'param': ':speed',
                    'values': [0, 10, 25, 50, 75, 90, 100]
                  }
                ]
            },
            {
                'url' :  '/lighting/2/:animation/:color/:brightness/:speed',
                'description' : rowDescription,
                'params': [
                  {
                    'param': ':animation',
                    'values': animations
                  },
                  {
                    'param': ':color',
                    'values': ['000000', '0000FF', '00FF00', 'FF0000', 'FFFFFF']
                  },
                  {
                    'param': ':brightness',
                    'values': [10, 25, 50, 75, 90, 100]
                  },
                  {
                    'param': ':speed',
                    'values': [0, 10, 25, 50, 75, 90, 100]
                  }
                ]
            },
            {
                'url' :  '/lighting/3/:animation/:color/:brightness/:speed',
                'description' : rowDescription,
                'params': [
                  {
                    'param': ':animation',
                    'values': animations
                  },
                  {
                    'param': ':color',
                    'values': ['000000', '0000FF', '00FF00', 'FF0000', 'FFFFFF']
                  },
                  {
                    'param': ':brightness',
                    'values': [10, 25, 50, 75, 90, 100]
                  },
                  {
                    'param': ':speed',
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

app.get('/:barchartReceiver/:animation/:color', function(req, res) {
    lightingDefault(req, res);
});

app.get('/:barchartReceiver/:animation/:color/:brightness/:speed', function(req, res) {
    lighting(req, res);
});





function getAvailableBars(req, res) {
    updateApiStatus();
    res.json(API);
}

// 1. Get params
function lighting(req, res) {

    var requestUrl                  = req.url,                      // "/all/100"
        barchartReceiver            = req.params.barchartReceiver,  // bar [A-J][1-10]
        animation                   = req.params.animation,         // see var animations
        color                       = req.params.color,             // HEX-Color
        brightness                  = req.params.brightness,        // [0-100] %
        speed                       = req.params.speed;             // [0-100] %

    animate(req, res, requestUrl, barchartReceiver, animation, color, brightness, speed);
}

// 1.1 Get params (default values)
function lightingDefault(req, res) {

    var requestUrl                  = req.url,                      // "/all/100"
        barchartReceiver            = req.params.barchartReceiver,  // bar [A-J][1-10]
        animation                   = req.params.animation,         // see var animations
        color                       = req.params.color,             // HEX-Color
        brightness                  = 100,                          // [0-100] %
        speed                       = 100                           // [0-100] %

    animate(req, res, requestUrl, barchartReceiver, animation, color, brightness, speed);
}

// 2. Set Animation
function animate(req, res, requestUrl, barchartReceiver, animation, color, brightness, speed) {

        // communication with arduino
        arduinoApiVersion           = 0,                            // used API version for I²C communication

        // computed params


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
         'arduino-api'      : arduinoApiVersion,
         'animation'        : animation,
         'color'            : color,
         'brightness'       : brightness,
         'speed'            : speed,
         'timezone-offset'  : timezoneOffset
     };

     res.json(jsonResponse);
}
