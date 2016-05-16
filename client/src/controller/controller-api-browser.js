'use strict';
angular
.module( 'app.controller.apibrowser', [
                                  'ngMaterial',
                                  'ngMessages'
                                ] )

// constants
.constant('MODULE_VERSION', '0.0.1')


// // // // // // // // // // // // // // // // // // // // // // // // //
// Help
.controller('ApiBrowserController', function($scope, $log, $http, $rootScope) {

    $rootScope.currentPage = $rootScope.mainPages[3];

    $log.debug("ApiBrowserController");

    $scope.apiVersion = '0';
    $scope.details;

    $scope.findVersion =  $scope.apiVersion;

    $http({method: 'GET' , url: 'api/v'+  $scope.apiVersion}).
        success(function(data, status) {
          console.log(data);
          $scope.title = data.description;
          $scope.apiVersion = data.version;
          $scope.author = data.author;
          $scope.operations = data.api;
        }).
        error(function(data, status) {
          console.log(data || "Request failed");
      });


      $scope.setDetail = function setDetail(uri) {


          $http({method: 'GET' , url: 'api/v' + $scope.apiVersion + uri}).
              success(function(data, status) {
                console.log(data);
                $scope.details = data.urls;
              }).
              error(function(data, status) {
                console.log(data || "Request failed");
                $scope.details = [];
            });

      };


      $scope.send = function send() {

           $http({method: 'GET' , url: 'api/v'+  $scope.findVersion}).
              success(function(data, status) {
                console.log(data);
                $scope.title = data.description;
                $scope.apiVersion = data.version;
                $scope.author = data.author;
                $scope.operations = data.api;
              }).
              error(function(data, status) {
                console.log(data || "Request failed");
                $scope.findVersion = '';
                $scope.apiVersion = 'not found';
                $scope.operations = '';
                $scope.details = [];
            });

      };
});
