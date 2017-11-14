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

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// =======================
// CREATE INITIAL ENTITIES
// =======================

// Player character.
function createInitialCharacter() {
     entityManager.generateCharacter();
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

    processDiagnostics();

    entityManager.update(du);

    if (g_currentLevel.number === 1 && g_currentLevel.collectibles === 0) {
      startLevel(level2);
    }

    if (g_currentLevel.number === 2 && g_currentLevel.collectibles === 0) {
      startLevel(level3);
    }
}

// =========================
// GAME-SPECIFIC DIAGNOSTICS
// =========================

var KEY_MIXED   = keyCode('M');
var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');
var KEY_LEVEL1 = keyCode('1');
var KEY_LEVEL2 = keyCode('2');
var KEY_LEVEL3 = keyCode('3');

function processDiagnostics() {

    if (eatKey(KEY_MIXED)) g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_LEVEL1)) startLevel(level1);

    if (eatKey(KEY_LEVEL2)) startLevel(level2);

    if (eatKey(KEY_LEVEL3)) startLevel(level3);
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

function requestPreloads() {

    var requiredImages = {
        char_r   : "images/character/2D_GOBLIN_R.png",
        char_l  : "images/character/2D_GOBLIN_L.png",
        enemy_l : "images/enemies/enemy-l.png",
        enemy_r : "images/enemies/enemy-r.png",
        f_enemy_l : "images/enemies/f-enemy1-l.png",
        f_enemy_r : "images/enemies/f-enemy1-r.png",
        heart : "images/misc/heart15px.png",
        collectible : "images/collectibles/bomb.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

function preloadDone() {

    g_sprites.char_r  = new Sprite(g_images.char_r);
    g_sprites.char_l = new Sprite(g_images.char_l);

    g_sprites.enemy_l = new Sprite(g_images.enemy_l);
    g_sprites.enemy_r = new Sprite(g_images.enemy_r);
    g_sprites.f_enemy_l = new Sprite(g_images.f_enemy_l);
    g_sprites.f_enemy_r = new Sprite(g_images.f_enemy_r);

    g_sprites.heart = new Sprite(g_images.heart);

    g_sprites.collectible = new Sprite(g_images.collectible);

    startGame();

    main.init();
}

// Kick it off
requestPreloads();
