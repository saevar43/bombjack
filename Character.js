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

  this._width = this.sprite.width;

  this._height = this.sprite.height;
};

Character.prototype = new Entity();

// Key codes for control.
Character.prototype.KEY_JUMP = 'W'.charCodeAt(0);
Character.prototype.KEY_LEFT = 'A'.charCodeAt(0);
Character.prototype.KEY_RIGHT = 'D'.charCodeAt(0);

// Default Values.
Character.prototype.rotation = 0;
Character.prototype.cx = 200;
Character.prototype.cy = 100;

var NOMINAL_GRAVITY = 15;

Character.prototype.computeGravity = function () {
  return g_useGravity ? NOMINAL_GRAVITY : 0;
};

Character.prototype.update = function (du) {

  spatialManager.unregister(this);

  if (eatKey(this.KEY_LEFT) && this.cx - this._width/2 > 0) this.cx -= 30 * du;
  if (eatKey(this.KEY_RIGHT) && this.cx + this._width/2 < g_canvas.width) this.cx += 30 * du;
  if (eatKey(this.KEY_JUMP) && this.cy - this._height/2 > 0) this.cy -= 200;
  if (this.cy + this._height/2 < g_canvas.height) this.cy += this.computeGravity();

  spatialManager.register(this);
};

Character.prototype.render = function (ctx) {
  var origScale = this.sprite.scale;

  this.sprite.scale = this._scale;
  this.sprite.drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
  this.sprite.scale = origScale;
};
