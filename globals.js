// =======
// GLOBALS
// =======
/*

Evil, ugly (but "necessary") globals, which everyone can use.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

// Canvas and context.
var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

// Preload globals.
var g_images = {};
var g_sprites = {};

// Game specific globals.
var g_currentLevel;
var g_playerChar;
var g_onMenu;
var jumpSound = new Audio('audio/jump.wav');

// Diagnostic globals.
var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;

// The "nominal interval" is the one that all of our time-based units are
// calibrated to e.g. a velocity unit is "pixels per nominal interval"
//
var NOMINAL_UPDATE_INTERVAL = 16.666;
// var NOMINAL_UPDATE_INTERVAL = 0.666;

// Multiply by this to convert seconds into "nominals"
var SECS_TO_NOMINALS = 1000 / NOMINAL_UPDATE_INTERVAL;
