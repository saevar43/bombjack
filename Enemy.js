function Enemy(descr) {
  this.setup(descr);

  this.sprite = g_sprites.enemy_r;
  this._scale = 1;

  this._width = this.sprite.width;
  this. height = this.sprite.height;
  this.radius = this._width/2;
}

// Enemies are entities.
Enemy.prototype = new Entity();

// Prototype assets.
Enemy.prototype.flying = false;

Enemy.prototype.leftBound = 0;
Enemy.prototype.rightBound = 300;
Enemy.prototype.topBound = 0;
Enemy.prototype.bottomBound = 0;

Enemy.prototype.cx = 32;
Enemy.prototype.cy = 562;
Enemy.prototype.velX = 3.5;
Enemy.prototype.velY = 0;

// Update enemies.
Enemy.prototype.update = function (du) {

  spatialManager.unregister(this);

  // Enemies move back in forth within a specified zone.
  if (this.cx - this._width/2 + this.velX < this.leftBound) {
    this.sprite = g_sprites.enemy_r;
    this.velX *= -1;
  }

  if (this.cx +this._width/2 + this.velX > this.rightBound) {
    this.sprite = g_sprites.enemy_l;
    this.velX *= -1;
  }

  this.cx += this.velX * du;

  spatialManager.register(this);

};

// Render enemies.
Enemy.prototype.render = function (ctx) {
  var origScale = this.sprite.scale;

  this.sprite.scale = this._scale;
  this.sprite.drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
  this.sprite.scale = origScale;
};
