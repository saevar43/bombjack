// ============
// LEVEL OBJECT
// ============

function Level(descr) {
  for (var property in descr) {
    this[property] = descr[property];
  }

  this.countCollectibles();
};

Level.prototype = new Entity();

Level.prototype.number = 0;
Level.prototype.collectibles = 0;
Level.prototype.finished = false;
Level.prototype.background = "";
Level.prototype.array = [];
Level.prototype.enemies = [];

Level.prototype.finishLevel = function() {
  this.finished = true;
};

Level.prototype.getLevel = function() {
  return this;
};

Level.prototype.countCollectibles = function() {
  for (var i = 0; i < this.array.length; i++) {
    for (var j = 0; j < this.array[i].length; j++) {
      if (this.array[i][j] === 2) this.collectibles++;
    }
  }
};


// ===============
// LEVEL FUNCTIONS
// ===============
// These are not part of the Level object.

function startLevel(level) {
  entityManager.init();
  spatialManager.init();

  g_currentLevel = level.getLevel();
  g_canvas.style.background = level.background;

  g_playerChar.moveToStart();
  generateCollectibles(level.array);

  for (var i = 0; i < level.enemies.length; i++) {
    entityManager.generateEnemy(level.enemies[i]);
  }
}

function startGame() {
  g_currentLevel = level1;
  g_canvas.style.background = g_currentLevel.background;

  createInitialCharacter();
  generateCollectibles(g_currentLevel.array);

  for (var i = 0; i < level1.enemies.length; i++) {
    entityManager.generateEnemy(g_currentLevel.enemies[i]);
  }

  g_playerChar = entityManager.getPlayerChar();
}

function generateCollectibles(array) {
  for (var i = 0; i < array.length; i++) { //23 hæðir/línur
		for (var j = 0; j < array[i].length; j++) {
      var newcx = 20+j*40;
      var newcy = 40+i*25;
      if (array[i][j] === 2) {
        entityManager.generateCollectible({
          cx: newcx,
          cy: newcy}
        );
      }
		}
	}
}


// ==================
// PLATFORM FUNCTIONS
// ==================

var halfHeight = 10;
var halfWidth = 20;

// Used to render platforms.
function fillPlatform(ctx, x, y) {
    var oldStyle = ctx.fillStyle;
    ctx.fill();
    ctx.fillStyle = "rgb(255,209,26)";
    ctx.fillRect(x - halfWidth, y - halfHeight, halfWidth *2, halfHeight*2);
    ctx.fillStyle = oldStyle;
}

// Render platforms.
function renderPlatform(ctx) {
  for (var i = 0; i < 23; i++) {
		for (var j = 0; j < 15; j++) {
      var newcx = 20+j*40;
      var newcy = 40+i*25;
      if (g_currentLevel.number === 1) {
        if (level1.array[i][j] === 1) fillPlatform(ctx, newcx, newcy);
      } else if (g_currentLevel.number === 2) {
        if (level2.array[i][j] === 1) fillPlatform(ctx, newcx, newcy);
      } else if (g_currentLevel.number === 3) {
        if (level3.array[i][j] === 1) fillPlatform(ctx, newcx, newcy);
      } else if (g_currentLevel.number === 4) {
        if (level4.array[i][j] === 1) fillPlatform(ctx, newcx, newcy);
      } else if (g_currentLevel.number === 5) {
        if (level5.array[i][j] === 1) fillPlatform(ctx, newcx, newcy);
      }
    }
	}
}

// Platform collision.
function platformCollidesWith(nextX, nextY) {
    var j = Math.round((nextX-20)/40); //hér er x gildið, eða j gildi fylkisins
    var i = Math.ceil((nextY-40)/25); //hér er y gildið, eða i gildi fylkisins
    if (i<0 || i>22) return false;
    if (j<0 || j>14) return false;
    if (g_currentLevel.number === 1) {
      if (level1.array[i][j] === 1) return (40+i*25)-halfHeight;
    }
    if (g_currentLevel.number === 2) {
      if (level2.array[i][j] === 1) return (40+i*25)-halfHeight;
    }
    if (g_currentLevel.number === 3) {
      if (level3.array[i][j] === 1) return (40+i*25)-halfHeight;
    }
    if (g_currentLevel.number === 4) {
      if (level4.array[i][j] === 1) return (40+i*25)-halfHeight;
    }
    if (g_currentLevel.number === 5) {
      if (level5.array[i][j] === 1) return (40+i*25)-halfHeight;
    }
    return false; //no collision
}
