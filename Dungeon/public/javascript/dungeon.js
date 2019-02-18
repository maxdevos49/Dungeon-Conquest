import protoCore from "./protoCore/protoCore.js";
import Rectangle from "./protoCore/canvas/rectangle.js";
// import SpriteParent from "./protoCore/canvas/SpriteParent.js";
import TileMap from "./protoCore/canvas/TileMap.js";
import Player from "./player.js";

let options = {
    setup: setup,
    update: update,
    draw: draw,
    // autoStart: false,
    framerate: 60
};

let r;
let player, tm, p;

function setup(canvas, ctx) {
    tm = new TileMap(ctx, player.map, 50, 100, 100);
    r = new Rectangle(ctx, -100, 100, 100, 100);
    r.setAnchor(50, 50);
    r.setFillStyle("Blue");
    r.showBounds();
    r.fill = true;
}

function update(canvas, ctx) {
    if (r.position.x >= this.canvasWidth + r.anchor.x) {
        r.position.x = -100;
    } else {
        r.rotate(3);
        r.position.x += 2.2;
    }

    tm.mapParent.translateX(3);
}

function draw(ctx, canvas) {
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    tm.draw();

    r.draw();
}



player = new Player(io({ reconnection: false }), function() {
    p = new protoCore(options);
});
