function Collectible(descr) {
  this.setup(descr);

  this.sprite = g_sprites.collectible;
  this._scale = 1;

  this._width = this.sprite.width;
  this. height = this.sprite.height;
  this.radius = this._width/2;

  this._isCollected = false;
}

//Collectibles are entities
Collectible.prototype = new Entity();

Collectible.prototype.update = function(du) {
  spatialManager.unregister(this);
  if (this._isCollected) return entityManager.KILL_ME_NOW;

  if (this.isColliding().isCharacter) {
    eat.volume = 1;
    eat.play();

    this._isCollected = true;
    g_currentLevel.collectibles--;
  } else {
    spatialManager.register(this);
  }
}

Collectible.prototype.render = function (ctx) {
  var origScale = this.sprite.scale;

  this.sprite.scale = this._scale;
  this.sprite.drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
  this.sprite.scale = origScale;
}
