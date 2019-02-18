import protoCore from "./protoCore/protoCore.js";
import Rectangle from "./protoCore/canvas/rectangle.js";
import SpriteParent from "./protoCore/canvas/SpriteParent.js";
import TileMap from "./protoCore/canvas/TileMap.js";

let options = {
    setup: setup,
    update: update,
    draw: draw,
    framerate: 60
};

let r;
let socket;
let tm;

//for testing ------------
function generate(width, height, max) {
    let result = []
    for (let i = 0; i < height; i++) {
        result[i] = Array(width)
            .fill()
            .map(() => Math.round(Math.random() * max));
    }
    return result;
}
//------------------------



function setup(canvas, ctx){
    socket = io();
    r = new Rectangle(ctx, -100,100,100,100);
    r.setAnchor(50,50);
    r.setFillStyle("Blue");
    r.showBounds();
    r.fill = true;

    tm = new TileMap(ctx, generate(10, 10, 10), 100, 10, 10);

}

function update(canvas, ctx) {
    if (r.position.x >= this.canvasWidth + r.anchor.x) {
        r.position.x = -100;
    } else {
        r.rotate(3);
        r.position.x += 2.2;
    }

    tm.mapParent.translateX(1);
}

function keyupdate(){

}

function draw(ctx, canvas){
    
    ctx.clearRect(0,0, this.canvasWidth, this.canvasHeight);
    tm.draw();

    r.draw();

}

let p = new protoCore(options);
