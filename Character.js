// ===============
// CHARACTER STUFF
// ===============

"use strict"

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// Character constructor
function Character(descr) {
  this.setup(descr);

  this.sprite = g_sprites.ship2;

  this._scale = 1;
};

Character.prototype = new Entity();

// Key codes for control.
Character.prototype.KEY_JUMP = 'W'.charCodeAt(0);
Character.prototype.KEY_LEFT = 'A'.charCodeAt(0);
Character.prototype.KEY_RIGHT = 'D'.charCodeAt(0);

// Default Values.
Character.prototype.rotation = 0;
Character.prototype.cx = 200;
Character.prototype.cy = g_canvas.height - height/2;


Character.prototype.update = function (du) {

  // Unregister
  spatialManager.unregister(this);
  if (this._isDeadNow) return entityManager.KILL_ME_NOW;

  // Update position
  if (eatKey(this.KEY_LEFT)) this.cx -= 5 * du;
  if (eatKey(this.KEY_RIGHT)) this.cx += 5 * du;

  // Register
  spatialManager.register(this);
};

Character.prototype.render = function (ctx) {
  var origScale = this.sprite.scale;

  this.sprite.scale = this._scale;
  this.sprite.drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
  this.sprite.scale = origScale;
};
