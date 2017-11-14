function Enemy(descr) {
  this.setup(descr);

  if (this.flying) {
    this.sprite = g_sprites.f_enemy_r;
  } else if (this.latFly) {
    this.sprite = g_sprites.f_enemy_r;
  } else {
    this.sprite = g_sprites.enemy_r;
  }
  this._scale = 1;

  this._width = this.sprite.width;
  this._height = this.sprite.height;
  this.radius = this._width/2;

  this.isEnemy = true;
}

// Enemies are entities.
Enemy.prototype = new Entity();

// Prototype assets.
Enemy.prototype.flying = false;
Enemy.prototype.latFly = false;

Enemy.prototype.leftBound = 0;
Enemy.prototype.rightBound = 300;
Enemy.prototype.topBound = 0;
Enemy.prototype.bottomBound = 0;

Enemy.prototype.cx = 32;
Enemy.prototype.cy = 562;
Enemy.prototype.velX = 3.5;
Enemy.prototype.velY = 3.5;

// Update enemies.
Enemy.prototype.update = function (du) {

  spatialManager.unregister(this);

  // Enemies move back in forth within a specified zone.
  if (!this.flying) {
    if (this.cx - this._width/2 + this.velX < this.leftBound) {
      if (this.latFly) {
        this.sprite = g_sprites.f_enemy_r;
      } else {
        this.sprite = g_sprites.enemy_r;
      }
      this.velX *= -1;
    }

    if (this.cx + this._width/2 + this.velX > this.rightBound) {
      if (this.latFly) {
        this.sprite = g_sprites.f_enemy_l;
      } else {
        this.sprite = g_sprites.enemy_l;
      }
      this.velX *= -1;
    }

    this.cx += this.velX * du;

  } else {
    if (this.cy - this._height/2 + this.velY < this.topBound) {
      this.velY *= -1;
    }

    if (this.cy + this._height/2 + this.velY > this.bottomBound) {
      this.velY *= -1;
    }

    this.cy += this.velY * du;
  }

  spatialManager.register(this);

};

// Render enemies.
Enemy.prototype.render = function (ctx) {
  var origScale = this.sprite.scale;

  this.sprite.scale = this._scale;
  this.sprite.drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
  this.sprite.scale = origScale;
};
