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

// ==============
// GAME FUNCTIONS
// ==============

// Player character.
function createInitialCharacter() {
     entityManager.generateCharacter();
}

function showGame() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("myCanvas").style.display = "block";
}

var gameOverCount = 0;

function showGameOver() {
  g_gameOver = true;
  theme.pause();
  if (gameOverCount < 1) {
    gameOver.volume = 0.3;
    gameOver.play();
    gameOverCount++;
  }
  document.getElementById("myCanvas").style.display = "none";
  document.getElementById("gameOver").style.display = "flex";
}

function showYouWin() {
  document.getElementById("myCanvas").style.display = "none";
  document.getElementById("youWin").style.display = "flex";
}

function levelUp() {
  // nvm
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

    if (!g_gameOver) {
      theme.volume = 0.3;
      theme.play();
    }

    processDiagnostics();

    if (g_playerChar.health === 0) {
      showGameOver();
    }

    entityManager.update(du);

    if (g_currentLevel.number === 1 && g_currentLevel.collectibles === 0) {
      startLevel(level2);
    }

    if (g_currentLevel.number === 2 && g_currentLevel.collectibles === 0) {
      startLevel(level3);
    }

    if (g_currentLevel.number === 3 && g_currentLevel.collectibles === 0) {
      startLevel(level4);
    }
    if (g_currentLevel.number === 4 && g_currentLevel.collectibles === 0) {
      startLevel(level5);
    }

    if (g_currentLevel.number === 5 && g_currentLevel.collectibles === 0) {
      showYouWin();
    }
}

// =========================
// GAME-SPECIFIC DIAGNOSTICS
// =========================

var KEY_MIXED   = keyCode('M');
var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');

// Toggle this to bea able to switch between levels.
// var KEY_LEVEL1 = keyCode('1');
// var KEY_LEVEL2 = keyCode('2');
// var KEY_LEVEL3 = keyCode('3');
// var KEY_LEVEL4 = keyCode('4');
// var KEY_LEVEL5 = keyCode('5');

function processDiagnostics() {

    if (eatKey(KEY_MIXED)) g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    // Toggle this to be able to switch between levels.
    // if (eatKey(KEY_LEVEL1)) startLevel(level1);
    //
    // if (eatKey(KEY_LEVEL2)) startLevel(level2);
    //
    // if (eatKey(KEY_LEVEL3)) startLevel(level3);
    //
    // if (eatKey(KEY_LEVEL4)) startLevel(level4);
    //
    // if (eatKey(KEY_LEVEL5)) startLevel(level5);
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
        char_r   : "images/character/char_idle_r.png",
        char_l  : "images/character/char_idle_l.png",
        char_run_r : "images/character/char_run1.png",
        char_run2_r : "images/character/char_run2.png",
        char_run3_r : "images/character/char_run3.png",
        char_run4_r : "images/character/char_run4.png",
        char_run5_r : "images/character/char_run5.png",
        char_run_l : "images/character/char_run1l.png",
        char_run2_l : "images/character/char_run2l.png",
        char_run3_l : "images/character/char_run3l.png",
        char_run4_l : "images/character/char_run4l.png",
        char_run5_l : "images/character/char_run5l.png",
        char_jump_r : "images/character/char_jump_r.png",
        char_jump_l : "images/character/char_jump_l.png",
        char_fall_r : "images/character/char_fall_r.png",
        char_fall_l : "images/character/char_fall_l.png",

        enemy_l : "images/enemies/enemy-l.png",
        enemy_r : "images/enemies/enemy-r.png",
        f_enemy_l : "images/enemies/f-enemy1-l.png",
        f_enemy_r : "images/enemies/f-enemy1-r.png",

        heart : "images/misc/heart15px.png",
        collectible : "images/collectibles/donut.png",

        menubutton : "images/misc/menu_button1.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

function preloadDone() {

    g_sprites.char_r  = new Sprite(g_images.char_r);
    g_sprites.char_l = new Sprite(g_images.char_l);
    g_sprites.char_run_r = new Sprite(g_images.char_run_r);
    g_sprites.char_run2_r = new Sprite(g_images.char_run2_r);
    g_sprites.char_run3_r = new Sprite(g_images.char_run3_r);
    g_sprites.char_run4_r = new Sprite(g_images.char_run4_r);
    g_sprites.char_run5_r = new Sprite(g_images.char_run5_r);
    g_sprites.char_run_l = new Sprite(g_images.char_run_l);
    g_sprites.char_run2_l = new Sprite(g_images.char_run2_l);
    g_sprites.char_run3_l = new Sprite(g_images.char_run3_l);
    g_sprites.char_run4_l = new Sprite(g_images.char_run4_l);
    g_sprites.char_run5_l = new Sprite(g_images.char_run5_l);
    g_sprites.char_jump_r = new Sprite(g_images.char_jump_r);
    g_sprites.char_jump_l = new Sprite(g_images.char_jump_l);
    g_sprites.char_fall_r = new Sprite(g_images.char_fall_r);
    g_sprites.char_fall_l = new Sprite(g_images.char_fall_l);

    g_sprites.enemy_l = new Sprite(g_images.enemy_l);
    g_sprites.enemy_r = new Sprite(g_images.enemy_r);
    g_sprites.f_enemy_l = new Sprite(g_images.f_enemy_l);
    g_sprites.f_enemy_r = new Sprite(g_images.f_enemy_r);

    g_sprites.heart = new Sprite(g_images.heart);
    g_sprites.collectible = new Sprite(g_images.collectible);

    g_gameOver = false;

    startGame();

    main.init();
}

// Kick it off
requestPreloads();
