//Platform Stuff

var halfHeight = 10;
var halfWidth = 20;

function renderPlatform(ctx) {
  for (var i = 0; i<23; i++) { //23 hæðir/línur
		for (var j = 0; j<15; j++) {
      var newcx = 20+j*40;
      var newcy = 40+i*25;
      if (platform[i][j] === 1) fillPlatform (ctx, newcx, newcy);
      }
	}
}

function generateCollectibles(array) {
  for (var i = 0; i<23; i++) { //23 hæðir/línur
		for (var j = 0; j<15; j++) {
      var newcx = 20+j*40;
      var newcy = 40+i*25;
      if (platform[i][j] === 2) entityManager.generateCollectible({cx: newcx, cy: newcy});
		}
	}
}

function updatePlatform() {
  renderPlatform(g_ctx);
}

function platformCollidesWith(nextX, nextY) {
    var j = Math.round((nextX-20)/40); //hér er x gildið, eða j gildi fylkisins
    var i = Math.round((nextY-50)/25); //hér er y gildið, eða i gildi fylkisins
    if (i<0 || i>22) return false;
    if (j<0 || j>14) return false;
    if (platform[i][j] === 1) {
      return true; //collision
    }
    return false; //no collision
}


function fillPlatform(ctx, x, y) { //value 1 er platform. Bætum meira við seinna
    ctx.fill();
    ctx.fillStyle = "rgba(160,82,45)";
    ctx.fillRect(x - halfWidth, y - halfHeight, halfWidth *2, halfHeight*2);
}


//Array fyrir platfroms. 0 gildi þýðir tómt. 1 þýðir platform.
//Önnur gildi geta verið td sprengjur og stuff

var platform = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,0,0,0,0,0,0,0,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //23 línur
];
