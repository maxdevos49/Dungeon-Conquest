import protoCore from "./protoCore/protoCore.js";
import TileMap from "./protoCore/canvas/TileMap.js";
import Player from "./player.js";

const Direction = {
    NONE: 0,
    UP: 1,
    RIGHT: 2,
    DOWN: 3,
    LEFT: 4
};

let options = {
    setup: setup,
    update: update,
    draw: draw,
    keyDown: keyDown,
    keyUp: keyUp,
    framerate: 30
};

let player, tm, p;

function setup(canvas, ctx) {
    tm = new TileMap(ctx, player.map, 75, 30, 30);
}

function update(canvas, ctx) {
    let speed = 15;
    //Move player
    switch (Player.direction) {
        case Direction.UP:
            tm.mapParent.translateY(speed);
            break;
        case Direction.RIGHT:
            tm.mapParent.translateX(-speed);
            break;
        case Direction.DOWN:
            tm.mapParent.translateY(-speed);
            break;
        case Direction.LEFT:
            tm.mapParent.translateX(speed);
            break;
    }
}

function keyDown(e) {
    e.preventDefault();

    switch (e.keyCode) {
        case 70:
            this.fullScreen();
            break;
        case 87:
        case 38:
            Player.direction = Direction.UP;
            break;
        case 83:
        case 40:
            Player.direction = Direction.DOWN;
            break;
        case 68:
        case 39:
            Player.direction = Direction.RIGHT;
            break;
        case 65:
        case 37:
            Player.direction = Direction.LEFT;
            break;
        default:
            console.log(e.keyCode);
            break;
    }
}

function keyUp(e) {
    e.preventDefault();

    switch (e.keyCode) {//needs changes but ok for know
        case 87:
        case 83:
        case 68:
        case 65:
        case 38:
        case 39:
        case 40:
        case 37:
            Player.direction = Direction.NONE;
            break;
    }
}

function draw(ctx, canvas) {
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    tm.draw();
}

player = new Player(io({ reconnection: false }), function() {
    p = new protoCore(options);
});
