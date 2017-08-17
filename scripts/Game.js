"use strict";
import KeyCodes         from "../src/engine/various/KeyCodes"
import Logger           from "../src/engine/modules/Logger"
import Core             from "../src/engine/Core"
import {Vec2}           from "../src/engine/modules/Geometry2D"
import BoundingBox      from "../src/engine/collisions/BoundingBox"
import PositionalBox    from "../src/engine/interface/PositionalBox"
import GameDescriptor   from "./game.descriptor.json"
import Pj               from "./gameobjects/Pj"
import Enemy            from "./gameobjects/Enemy"
import Disk             from "./gameobjects/Disk"
import Area             from "./gameobjects/Area"

class GameStatus {

    constructor() {
        this._mustDrawInfo    = true;
        this._paused          = false;
    }

    set MustDrawInfo(value) { this._mustDrawInfo = value }

    get MustDrawInfo() { return this._mustDrawInfo }

    set Paused(value) { this._paused = value }

    get Paused() { return this._paused }

}

const gameStatus = new GameStatus();
export { gameStatus as default };

// --------------------------------------------------------------

// Vars
const drawablesInfoObjects = [];
let ctx = null;

// Engine Core initialization
// [0] Configuration
// [1] Graphics
const core = Core.Instance;
core.initialize(GameDescriptor['engine']['core']);
core.ClearColor = GameDescriptor['engine']['clear-color'];
ctx = core.initGraphics(null, new Vec2(GameDescriptor['engine']['board-dimension']));
core.postGraphicsInitialization();

// Register custom objects
Core.GameObjectLoader.RegisterObjects(['Pj', 'Enemy', 'Disk', 'Area'], [Pj, Enemy, Disk, Area]);

// Set game callback
core.gameCallback = function () {
    Core.GameStorage.ObjectsList.forEach(object => object.draw());
    if (gameStatus.MustDrawInfo) drawablesInfoObjects.forEach(object => object.draw());

    if (gameStatus.Paused === false) {
        Core.GameStorage.ObjectsList.forEach(object => object.update());
    } else drawPause();
};

// Attach global keylistener
Core.AddKeyListener(keyCode => {
    switch (keyCode) {
        case KeyCodes.ADD:
        case 171:
            core.updateFps(5);
            break;
        case KeyCodes.SUBSTRACT:
        case 173:
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
    let obj = Core.GameObjectLoader.ObjectNewInstance(object.type);
    obj.Name = object.name;
    obj.Position = new Vec2(object.position);
    obj.Size = new Vec2(object.size);
    Logger.Append(`[Game] Created new ${object.type} [${obj.Id}] ${obj.Name}`);

    if (typeof object.color === 'string' && object.color !== 'default') obj.Color = object.color;
    if (object.rotation) obj.Rotation = object.rotation;
    if (object.normal) obj.Normal = new Vec2(object.normal);
    if (object.group) obj.Group = object.group;
    if (obj.attachCollider) obj.attachCollider(new BoundingBox());

    /*updatables.push(obj);
    drawables.push(obj);*/

    switch(object.type) {
        case 'Pj':
        case 'Enemy':
        case 'Disk':
            let box = new PositionalBox();
            box.configure(obj.Position, obj.Size, 20);
            box.follow(obj);

            drawablesInfoObjects.push(box);
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

/**
 *
 * 0.707 /  0.707
 * 0.707 / -0.707
 *
 */

setInterval(() => {
    for (let count = 0; count < 5; count++)
        Core.ParticlesEmitter.add(new Vec2([200, 200]), Math.random() * 1000, Vec2.GetNormalizedVector(Math.random() * 40 - 20), Math.random() * 20);
}, 0);
