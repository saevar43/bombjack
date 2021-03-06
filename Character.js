function Character(descr) {
  this.setup(descr);

  this.rememberResets();

  this.sprites_run_r = [g_sprites.char_run_r,
    g_sprites.char_run2_r,
    g_sprites.char_run3_r,
    g_sprites.char_run4_r,
    g_sprites.char_run5_r
  ];
  this.sprites_run_l = [g_sprites.char_run_l,
    g_sprites.char_run2_l,
    g_sprites.char_run3_l,
    g_sprites.char_run4_l,
    g_sprites.char_run5_l
  ];
  this.sprite = g_sprites.char_r;
  this.lifeSprite = g_sprites.heart;
  this._scale = 1;
  this._isDying = false;

  this.health = 3;

  this._width = this.sprite.width;
  this._height = this.sprite.height;
  this.radius = this._height/2 - 2;

  this.isCharacter = true;
}

// Character is an Entity
Character.prototype = new Entity();

// Remember starting position
Character.prototype.rememberResets = function () {
  this.reset_cx = this.cx;
  this.reset_cy = this.cy;
};

// Prototype assets
Character.prototype.leftBound = 10;
Character.prototype.rightBound = 590;

Character.prototype.cx = 450;
Character.prototype.cy = 568;
Character.prototype.velY = 0.0;
Character.prototype.velX = 7.5;

Character.prototype.onGround = true;
Character.prototype.gravity = 2.5;

Character.prototype.animCount = 0;
Character.prototype.right;

// Control keys
Character.prototype.GO_LEFT = 'A'.charCodeAt(0);
Character.prototype.GO_RIGHT = 'D'.charCodeAt(0);
Character.prototype.JUMP = 'W'.charCodeAt(0);

Character.prototype.resetChar = function () {
  this.setPos(this.reset_cx, this.reset_cy);
  spatialManager.unregister(this);
};

Character.prototype.startJump = function (du) {
  if (this.onGround) {
    this.velY = -30.0 * du;
  }
};

Character.prototype.die = function () {

    damage.volume = 0.8;
    damage.play();

    this._isDying = true;
    this._scaleDirn = -1;
    this.health -= 1;

    // Unregister me from my old posistion
    // ...so that I can't be collided with while dying
    spatialManager.unregister(this);
};

Character.prototype._updateDeath = function (du) {

    var SHRINK_RATE = 3 / SECS_TO_NOMINALS;
    this._scale += this._scaleDirn * SHRINK_RATE * du;

    if (this._scale < 0.2) {

        this.moveToStart();
        this._scaleDirn = 1;

    } else if (this._scale > 1) {

        this._scale = 1;
        this._isDying = false;

        // Reregister me from my old posistion
        // ...so that I can be collided with again
        spatialManager.register(this);

    }
};

Character.prototype.moveToStart = function () {

  this.cx = this.reset_cx;
  this.cy = this.reset_cy;

};

// Update character
Character.prototype.update = function (du) {

  if (this.health === 0) this._isDeadNow = true;
  // Handle death
  if (this._isDying) {
      this._updateDeath(du);
      return;
  }

  spatialManager.unregister(this);
  if (this._isDeadNow) return entityManager.KILL_ME_NOW;

  if (this.right) {
    this.sprite = g_sprites.char_r;
  } else {
    this.sprite = g_sprites.char_l;
  }

  if (keys[this.GO_LEFT] && this.cx - (this._width/2) > this.leftBound) {
    // Animation
    this.sprite = this.sprites_run_l[this.animCount];
    this.animCount++;
    if (this.animCount === this.sprites_run_l.length) this.animCount = 0;
    this.right = false;

    this.cx -= this.velX * du;
  }
  if (keys[this.GO_RIGHT] && this.cx + (this._width/2) < this.rightBound) {
    // Animation
    this.sprite = this.sprites_run_r[this.animCount];
    this.animCount++;
    if (this.animCount === this.sprites_run_r.length) this.animCount = 0;
    this.right = true;

    this.cx += this.velX * du;
  }
  if (eatKey(this.JUMP)) {
    jumpSound.volume = 0.3;
    jumpSound.play();
    this.startJump(du);
  }

  // Jump and fall animations.
  if (this.velY < 0 && !this.right) {
    this.sprite = g_sprites.char_jump_l;
  }
  if (this.velY < 0 && this.right) {
    this.sprite = g_sprites.char_jump_r;
  }
  if (this.velY > 0 && !this.right) {
    this.sprite = g_sprites.char_fall_l;
  }
  if (this.velY > 0 && this.right) {
    this.sprite = g_sprites.char_fall_r;
  }

  // Can't jump while airborne
  if (this.velY !== 0.0) this.onGround = false;

  // All that goes up, must come down.
  if (platformCollidesWith(this.cx, this.cy+this._height/2)) {
    this.cy = platformCollidesWith(this.cx, this.cy+this._height/2) - this._height/2 + 5;
  }else {
    if (this.velY < 30.0) this.velY += this.gravity * du;
  }
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

  if (this.isColliding().isEnemy) {
    this.die();
  } else {
    spatialManager.register(this);
  }

};
// Render Character and its health
Character.prototype.render = function (ctx) {
  var origScale = this.sprite.scale;

  this.sprite.scale = this._scale;
  this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
  this.sprite.scale = origScale;

  for (var i = 0; i < this.health; i++) {
    var lifeX = g_canvas.width - this.lifeSprite.width - i*this.lifeSprite.width;
    var lifeY = 0 + this.lifeSprite.height;
    this.lifeSprite.drawCentredAt(ctx, lifeX, lifeY, 0);
  }
};
