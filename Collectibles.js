function Collectible(descr) {
  this.setup(descr);

  this.sprite = g_sprites.collectible;
  this._scale = 1;

  this._width = this.sprite.width;
  this. height = this.sprite.height;
  this.radius = this._width/2;
}

//Collectibles are entities
Collectible.prototype = new Entity();

Collectible.prototype.update = function(du) { //Collectibles hverfa þegar þeim er náð, eftir að bæta við
}

Collectible.prototype.render = function (ctx) {
  var origScale = this.sprite.scale;

  this.sprite.scale = this._scale;
  this.sprite.drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation);
  this.sprite.scale = origScale;
}
