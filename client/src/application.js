'use strict';

var app = angular.module('NotiVisApplication',
[
    'ngMaterial',
    'ngMessages',

    // application modules
    'app.controller.navigation',

    // Main Pages
    'app.controller.timeline', // show event timeline
    'app.controller.manualcontrol', // control shape-changing display manually
    'app.controller.dashboard', // current stats
    'app.controller.apibrowser', // API Browser shows different API versions

    // Sub Pages
    'app.controller.devices',
    'app.controller.settings',
    'app.controller.help',
    'app.controller.share',

    // Utils

]);
