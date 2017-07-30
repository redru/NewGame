"use strict";
import GameDescriptor   from "./game.descriptor.json"
import GameObjectLoader from "./GameObjectLoader"

class GameStatus {

    constructor() {
        this.__$mustDrawInfo    = true;
        this.__$paused          = false;
    }

    set MustDrawInfo(value) { this.__$mustDrawInfo = value }

    get MustDrawInfo() { return this.__$mustDrawInfo }

    set Paused(value) { this.__$paused = value }

    get Paused() { return this.__$paused }

}

const gameStatus = new GameStatus();
export { gameStatus as default };

// --------------------------------------------------------------

// Vars
const updatables = [];
const drawables = [];
const drawablesInfoObjects = [];
let ctx = null;

// Engine Core initialization
// [0] Configuration
// [1] Graphics
const core = Core.Instance;
core.configure(GameDescriptor['engine']['core']);
ctx = core.initGraphics(null, new Vec2(GameDescriptor['engine']['board-dimension']));

// Set game callback
core.gameCallback = function () {
    drawables.forEach(object => object.draw());
    if (gameStatus.MustDrawInfo) drawablesInfoObjects.forEach(object => object.draw());

    if (gameStatus.Paused === false) {
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
            gameStatus.Paused = !gameStatus.Paused;
            break;
        case KeyCodes.Z:
            gameStatus.MustDrawInfo = !gameStatus.MustDrawInfo;
            core.restart(gameStatus.MustDrawInfo);
            break;
    }
});

GameDescriptor['game-objs'].forEach(object => {
    let obj = GameObjectLoader.ObjectNewInstance(object.type);

    if (obj.configure) {
        obj.configure(new Vec2(object.position), new Vec2(object.size));
    } else {
        obj.Position = new Vec2(object.position);
        obj.Size = new Vec2(object.size);
    }

    if (typeof object.color === 'string' && object.color !== 'default') obj.Color = object.color;
    if (object.rotation) obj.Rotation = object.rotation;

    updatables.push(obj);
    drawables.push(obj);

    switch(object.type) {
        case 'Pj':
        case 'Enemy':
            let box = new PositionalBox();
            box.configure(obj.Position, obj.Size, 20);
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

// Draw pause function in case of paused game
function drawPause() {
    ctx.fillStyle = 'rgb(0, 255, 0)';
    ctx.font = '48px serif';
    ctx.fillText('PAUSED', core.CanvasDim.X / 2 - 144, core.CanvasDim.Y / 2);
}

// Start engine
core.start(true);
