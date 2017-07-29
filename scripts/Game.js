"use strict";
import GameConfiguration    from "./GameConfiguration"
import Pj                   from "./Pj"
import Enemy                from "./Enemy"
import Disk                 from "./Disk"

// Vars
const updatables = [];
const drawables = [];

let paused = false;
let ctx = null;

// Engine Core initialization
// [0] Configuration
// [1] Graphics
let core = Core.GetInstance();
core.configure({fps: 60});
ctx = core.initGraphics(null, GameConfiguration.BOARD_DIMENSION);

// Pj creation and setup
let pj = new Pj();
pj.configure(GameConfiguration.PJ_INIT_POSITION, GameConfiguration.PJ_INIT_SIZE);
pj.setColor(0xFFAD7A);

updatables.push(pj);
drawables.push(pj);

let pjBox = new PositionalBox();
pjBox.configure(GameConfiguration.PJ_INIT_POSITION, GameConfiguration.PJ_INIT_SIZE, 20);
pjBox.follow(pj);

drawables.push(pjBox);

// Pj creation and setup
let enemy = new Enemy();
enemy.configure(new Vec2([1180, 320]), GameConfiguration.ENEMY_INIT_SIZE);

updatables.push(enemy);
drawables.push(enemy);

let enemyBox = new PositionalBox();
enemyBox.configure(Vec2.Zero(), GameConfiguration.ENEMY_INIT_SIZE, 20);
enemyBox.follow(enemy);

drawables.push(enemyBox);

// Disk creation and setup
let disk = new Disk();
disk.configure(new Vec2([400, 400]), GameConfiguration.PJ_INIT_SIZE);

updatables.push(disk);
drawables.push(disk);

let diskBox = new PositionalBox();
diskBox.configure(new Vec2([360, 360]), new Vec2([30, 30]), 20, -15);
diskBox.follow(disk);

drawables.push(diskBox);

// Set game callback
core.gameCallback = function () {
    drawables.forEach(object => object.draw());

    if (paused === false) {
        updatables.forEach(object => object.update());
    }
    else drawPause();
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
