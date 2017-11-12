// =========
// ASTEROIDS
// =========
/*

A sort-of-playable version of the classic arcade game.


HOMEWORK INSTRUCTIONS:

You have some "TODO"s to fill in again, particularly in:

spatialManager.js

But also, to a lesser extent, in:

Rock.js
Bullet.js
Ship.js


...Basically, you need to implement the core of the spatialManager,
and modify the Rock/Bullet/Ship to register (and unregister)
with it correctly, so that they can participate in collisions.

Be sure to test the diagnostic rendering for the spatialManager,
as toggled by the 'X' key. We rely on that for marking. My default
implementation will work for the "obvious" approach, but you might
need to tweak it if you do something "non-obvious" in yours.
*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");
g_canvas.style.background = "url('images/backgrounds/background2.jpg')";

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// =======================
// CREATE INITIAL ENTITIES
// =======================

// Player character.
function createInitialCharacter() {

     entityManager.generateCharacter({
         cx : 500,
         cy : 568
     });

}

// Enemies.
function createEnemies() {
  entityManager.generateEnemy();

  entityManager.generateEnemy({
    cx : 568,
    cy : 190,
    leftBound : 440,
    rightBound : 600
  });
}

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}

// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {

    updatePlatform(); //If platforms are entities we don't need this

    processDiagnostics();

    entityManager.update(du);
}

// =========================
// GAME-SPECIFIC DIAGNOSTICS
// =========================

var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;

var KEY_MIXED   = keyCode('M');
var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');

function processDiagnostics() {

    if (eatKey(KEY_MIXED)) g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;
}

// =================
// RENDER SIMULATION
// =================

function renderSimulation(ctx) {

    renderPlatform(ctx);
    entityManager.render(ctx);

    if (g_renderSpatialDebug) spatialManager.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        char_r   : "images/character/2D_GOBLIN_R.png",
        char_l  : "images/character/2D_GOBLIN_L.png",
        enemy_l : "images/enemies/enemy-l.png",
        enemy_r : "images/enemies/enemy-r.png",
        heart : "images/misc/heart15px.png",
        collectible : "images/collectibles/bomb.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    g_sprites.char_r  = new Sprite(g_images.char_r);
    g_sprites.char_l = new Sprite(g_images.char_l);

    g_sprites.enemy_l = new Sprite(g_images.enemy_l);
    g_sprites.enemy_r = new Sprite(g_images.enemy_r);

    g_sprites.heart = new Sprite(g_images.heart);

    g_sprites.collectible = new Sprite(g_images.collectible);

    entityManager.init();
    generateCollectibles(platform);
    createInitialCharacter();
    createEnemies();

    main.init();
}

// Kick it off
requestPreloads();
