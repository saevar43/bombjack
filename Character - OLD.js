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

  this.sprite = g_sprites.char_l;

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
Character.prototype.numSubSteps = 1;

var NOMINAL_GRAVITY = 10;

Character.prototype.computeGravity = function () {
  return g_useGravity ? NOMINAL_GRAVITY : 0;
};

Character.prototype.update = function (du) {

  // TODO: Handle collision.

  spatialManager.unregister(this);

  var steps = this.numSubSteps;
  var dStep = du / steps;
  for (var i = 0; i < steps; ++i) {
    this.computeSubStep(dStep);
  }
  if (eatKey(this.KEY_JUMP) && this.cy - this._height/2 > 0) this.cy -= 200 * du;

  if (this.cy + this._height/2 < g_canvas.height) {
    if (!platformCollidesWith(this.cx, this.cy+this._height/2)) this.cy += this.computeGravity();
  }

  // if (platformCollidesWith(this.cx, this.cy+this._height/2)) g_useGravity =! g_useGravity;

  spatialManager.register(this);
};

Character.prototype.computeSubStep = function (du) {

};

Character.prototype.render = function (ctx) {
  var origScale = this.sprite.scale;

  this.sprite.scale = this._scale;
  this.sprite.drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
  this.sprite.scale = origScale;
};
