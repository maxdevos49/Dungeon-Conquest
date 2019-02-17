import protoCore from "./protoCore/protoCore.js";
import Rectangle from "./protoCore/canvas/rectangle.js";

let options = {
    setup: setup,
    update: update,
    draw: draw,
    framerate: 60
};

let r;
let socket;

function setup(canvas, ctx){
    socket = io();
    r = new Rectangle(ctx, -100,100,100,100);
    r.setAnchor(50,50);
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


}

function keyupdate(){

}

function draw(ctx, canvas){
    
    ctx.clearRect(0,0, this.canvasWidth, this.canvasHeight);
    r.draw();
}

let p = new protoCore(options);
