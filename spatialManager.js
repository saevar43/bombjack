/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS
// <none yet>


// PUBLIC METHODS
init : function () {
  this._entities = [];
},

getNewSpatialID : function() {
  this._nextSpatialID++;
  return this._nextSpatialID - 1;
},

register: function(entity) {
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();

    var spatialPos = {
      posX: pos.posX,
      posY: pos.posY,
      radius: entity.getRadius(),
      entity: entity
    };
    this._entities[spatialID] = spatialPos;
},

unregister: function(entity) {
    var spatialID = entity.getSpatialID();

    var e = this._entities[spatialID];

    if (e) {
      e.posX = undefined;
      e.posY = undefined;
    }
},

findEntityInRange: function(posX, posY, radius) {

    // TODO: YOUR STUFF HERE!
    var minDistID = 0;
    var minDistSq = Infinity;
    var ent = this._entities;

    for (var ID in ent) {
      var e = ent[ID];
      if (e) {
        var distSq = util.wrappedDistSq(
            posX, posY,
            e.posX, e.posY,
            g_canvas.width, g_canvas.height);
        if (distSq < minDistSq) {
          minDistSq = distSq;
          minDistID = ID;
        }
      }
    }
    e = ent[minDistID];
    var r = e.radius;
    var sumRadius = radius + r;
    sumRadius *= sumRadius;

    if (minDistSq < sumRadius) {
      return e.entity;
    }
    return false;
},

render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";

    for (var ID in this._entities) {
        var e = this._entities[ID];
        util.strokeCircle(ctx, e.posX, e.posY, e.radius);
    }
    ctx.strokeStyle = oldStyle;
}

}
