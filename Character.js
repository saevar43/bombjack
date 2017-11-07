function Character(descr) {
  this.setup(descr);

  this.sprite = g_sprites.char_l;

  this._scale = 1;

  this._width = this.sprite.width;

  this._height = this.sprite.height;
}

Character.prototype = new Entity();

Character.prototype.leftBound = 0;
Character.prototype.rightBound = 600;
Character.prototype.cx = 300;
Character.prototype.cy = 568;
Character.prototype.velY = 0;
Character.prototype.velX = 7.5;
Character.prototype.onGround = true;
Character.prototype.gravity = 2.5;

Character.prototype.GO_LEFT = 'A'.charCodeAt(0);
Character.prototype.GO_RIGHT = 'D'.charCodeAt(0);
Character.prototype.JUMP = 'W'.charCodeAt(0);

Character.prototype.startJump = function (du) {
  if (this.onGround) {
    this.velY = -30.0 * du;
    this.onGround = false;
  }
};

Character.prototype.update = function (du) {
  if (keys[this.GO_LEFT] && this.cx - (this._width/2) > this.leftBound) {
    this.sprite = g_sprites.char_l;
    this.cx -= this.velX * du;
  }
  if (keys[this.GO_RIGHT] && this.cx + (this._width/2) < this.rightBound) {
    this.sprite = g_sprites.char_r;
    this.cx += this.velX * du;
  }
  if (eatKey(this.JUMP)) {
    this.startJump(du);
  }

  // All that goes up, must come down.
  if (!platformCollidesWith(this.cx, this.cy+this._height/2)) this.velY += this.gravity * du;
  this.cy += this.velY * du;

  //"no gravity" if character is on platform
  if (platformCollidesWith(this.cx, this.cy+this._height/2)) {
    this.velY = 0;
    this.onGround = true; //Can jump from platform
  }

  //Collides with platforms from below when jumping
  if(platformCollidesWith(this.cx, this.cy+this.velY*du)) this.velY = 0;

  // Don't fall out of canvas.
  if (this.cy > 568) {
    this.cy = 568;
    this.velY = 0;
    this.onGround = true;
  }

  //Don't jump out of canvas
  if (this.cy-this._height/3 < 0) {
    this.cy = 0+this._height/2;
    this.velY = 0;
  }


};

Character.prototype.render = function (ctx) {
  var origScale = this.sprite.scale;

  this.sprite.scale = this._scale;
  this.sprite.drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
  this.sprite.scale = origScale;
};
