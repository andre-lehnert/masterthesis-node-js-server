'use strict';
angular
.module( 'app.controller.manualcontrol', [
                                      'ngMaterial',
                                      'ngMessages',
                                      'colorpicker.module', // colorpicker
                                      'rzModule', // slider
                                      'material.svgAssetsCache',
                                      'ui.bootstrap'
                                    ] )

// constants
.constant('MODULE_VERSION', '0.0.1')


// // // // // // // // // // // // // // // // // // // // // // // // //
// #2 Manual Control
app.controller('ControlController', function($scope, $log, $rootScope, $timeout, $uibModal) {

    $rootScope.currentPage = $rootScope.mainPages[2];

    $log.debug("ControlController");

    // 1. Select bar

    //TODO Get current bar state
    // - available bars
    //  - last position
    //  - last color
    //  - last animation
    $scope.bars = {
      'cols': ['A', 'B', 'C'],
      'rows':[
      { 'number' : 1,
        'cols': [
          { 'name': 'A1',
            'class': 'md-fab md-primary md-hue-2',
            'position': 10,
            'animation': { 'name': 'Blink', 'color': 'rgba(10,255,0,1)', 'duration': 10, }
          },
          { 'name': 'B1',
            'class': 'md-fab md-primary',
            'position': 20,
            'animation': { 'name': 'Loading', 'color': 'rgba(20,255,100,1)', 'duration': 20, }
          },
          { 'name': 'C1',
            'class': 'md-fab md-primary md-hue-1',
            'position': 30,
            'animation': { 'name': 'None', 'color': 'rgba(30,255,255,1)', 'duration': 30, }
          },
        ]
      },
      { 'number' : 2,
        'cols': [
          { 'name': 'A2',
            'class': 'md-fab md-primary md-hue-2',
            'position': 10,
            'animation': { 'name': 'Blink', 'color': 'rgba(255,0,10,1)', 'duration': 10, }
          },
          { 'name': 'B2',
            'class': 'md-fab md-primary',
            'position': 20,
            'animation': { 'name': 'Loading', 'color': 'rgba(255,100,20,1)', 'duration': 20, }
          },
          { 'name': 'C2',
            'class': 'md-fab md-primary md-hue-1',
            'position': 30,
            'animation': { 'name': 'None', 'color': 'rgba(255,255,30,1)', 'duration': 30, }
          },
        ]
      },
      { 'number' : 3,
        'cols': [
          { 'name': 'A3',
            'class': 'md-fab md-primary md-hue-2',
            'position': 10,
            'animation': { 'name': 'Blink', 'color': 'rgba(255,10,0,1)', 'duration': 10, }
          },
          { 'name': 'B3',
            'class': 'md-fab md-primary',
            'position': 20,
            'animation': { 'name': 'Loading', 'color': 'rgba(255,20,100,1)', 'duration': 20, }
          },
          { 'name': 'C3',
            'class': 'md-fab md-primary md-hue-1',
            'position': 30,
            'animation': { 'name': 'None', 'color': 'rgba(255,30,255,1)', 'duration': 30, }
          },
        ]
      },
    ],
    'defaultColumnClasses': ['md-fab md-primary md-hue-2', 'md-fab md-primary', 'md-fab md-primary md-hue-1']
  };

  // Initialize
  $scope.isBarSelected = false;
  $scope.selectedBar = '';
  $scope.barPosition = 0; // Position Slider Model
  $scope.barColor = ''; // Color of selectedBar
  $scope.barAnimation = 'None'; // LED Animation


  $scope.selectBar = function (bar) {
    $log.debug("Selected Bar: "+ bar.name);
    $scope.selectedBar = bar;
    $log.debug("Selected Bar Position: "+ bar.position);
    $scope.barPosition = bar.position; // Set Slider Value
    $log.debug("Selected Bar Color: "+ bar.animation.color);
    $scope.barColor = bar.animation.color; // Set Color
    $scope.isBarSelected = true;
    $log.debug("Selected Animation: "+ bar.animation.name);
    $scope.animation = bar.animation.name; // Set Animation
    $log.debug("Selected Animation Duration: "+ bar.animation.duration);
    $scope.animationDuration = bar.animation.duration; // Set Animation Duration

    // reset bar classes
    for(var i=0; i < $scope.bars.rows.length; i++) {
      for(var j=0; j < $scope.bars.rows[i].cols.length; j++) {
        $scope.bars.rows[i].cols[j].class = $scope.bars.defaultColumnClasses[j];
      }
    }
    // highlight selected bar
    $scope.selectedBar.class = 'md-fab';

    $scope.refreshSlider();
  };

  // 2. Set bar position

  // Default slider configuration
  $scope.verticalSlider = {
        value: 0,
        options: {
            floor: 0,
            ceil: 100,
            vertical: true,
            showSelectionBar: true,
            step: 5,
            getSelectionBarColor: function(value) { return 'rgb(63,81,181)'; },
            getPointerColor: function(value) { return 'rgb(63,81,181)'; },
            translate: function(value) { return value + ' %'; }
        }
    };
    $scope.horizontalSlider = {
          value: 0,
          options: {
              floor: 0,
              ceil: 300,
              vertical: false,
              showSelectionBar: true,
              step: 5,
              getSelectionBarColor: function(value) { return 'rgb(63,81,181)'; },
              getPointerColor: function(value) { return 'rgb(63,81,181)'; },
              translate: function(value) { return value + ' s'; }
          }
      };



    $scope.refreshSlider = function () {
       $timeout(function () {
           $scope.$broadcast('rzSliderForceRender');
       });
     };

     // Refresh pointer position
     $scope.refreshSlider();


     // 3. Colorpicker
     $scope.changeColor = function (){
          $log.debug("Selected color: " + $scope.colorStyle);
    };


    $scope.animations = [
      'None',
      'Blink',
      'Blur',
      'Loading'
    ];

    $scope.selectAnimation = function (animation) {
         $log.debug("Selected animation: " + animation);
    };

    $scope.isRequestSend = false;
    $scope.isResponseReceived = false;
    $scope.request = {};
    $scope.request.text = 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!';
    // 4. Send Request
    $scope.sendUpdate = function () {
         $log.debug("Request: ");
         $scope.isRequestSend = true;
    };


});
