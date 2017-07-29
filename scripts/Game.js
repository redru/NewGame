"use strict";
import GameDescriptor   from "./game.descriptor.json"
import GameObjectLoader from "./GameObjectLoader"

// Vars
const updatables = [];
const drawables = [];
const drawablesInfoObjects = [];

let paused = false;
let mustDrawInfoObjects = true;
let ctx = null;

// Engine Core initialization
// [0] Configuration
// [1] Graphics
let core = Core.GetInstance();
core.configure(GameDescriptor['engine']['core']);
ctx = core.initGraphics(null, new Vec2(GameDescriptor['engine']['board-dimension']));

GameDescriptor['game-objs'].forEach(object => {
    let obj = GameObjectLoader.ObjectNewInstance(object.type);
    obj.configure(new Vec2(object.position), new Vec2(object.size));

    if (typeof object.color === 'string' && object.color !== 'default') obj.setColor(object.color);

    updatables.push(obj);
    drawables.push(obj);

    switch(object.type) {
        case 'Pj':
        case 'Enemy':
            let box = new PositionalBox();
            box.configure(obj.position, obj.size, 20);
            box.follow(obj);

            drawablesInfoObjects.push(box);
            break;
        case 'Disk':
            let diskbox = new PositionalBox();
            diskbox.configure(new Vec2([360, 360]), new Vec2([30, 30]), 20, -15);
            diskbox.follow(obj);

            drawablesInfoObjects.push(diskbox);
            break;
    }
});

// Set game callback
core.gameCallback = function () {
    drawables.forEach(object => object.draw());
    if (mustDrawInfoObjects) drawablesInfoObjects.forEach(object => object.draw());

    if (paused === false) {
        updatables.forEach(object => object.update());
    } else drawPause();
};

// Attach global keylistener
Core.AddKeyListener(keyCode => {
    switch (keyCode) {
        case KeyCodes.ADD:
            core.updateFps(5);
            break;
        case KeyCodes.SUBSTRACT:
            core.updateFps(-5);
            break;
        case KeyCodes.SPACE:
            paused = !paused;
            break;
        case KeyCodes.Z:
            mustDrawInfoObjects = !mustDrawInfoObjects;
            core.restart(mustDrawInfoObjects);
            break;
    }
});

// Draw pause function in case of paused game
function drawPause() {
    ctx.fillStyle = 'rgb(0, 255, 0)';
    ctx.font = '48px serif';
    ctx.fillText('PAUSED', core.canvasDim.x() / 2 - 144, core.canvasDim.y() / 2);
}

// Start engine
core.start(true);
