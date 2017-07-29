"use strict";

export default function Core() {
    this.canvas         = null;
    this.ctx            = null;
    this.canvasDim      = Vec2.Zero();
    this.fps            = 30;
    this.sleepTime      = 1000 / this.fps;
    this.intervalId     = -1;
    this.gameCallback   = function() { };
};

/**
 *
 * @param {Object} configuration
 * @param {number} configuration.fps
 * @param {number} [configuration.sleepTime]
 */
Core.prototype.configure = function(configuration) {
    this.fps = configuration.fps;
    this.sleepTime = configuration.sleepTime ? configuration.sleepTime : 1000 / configuration.fps;
};

Core.prototype.initGraphics = function(target, dimension) {
    this.canvas = document.getElementById(target ? target : '2DBoard');
    this.ctx = this.canvas.getContext('2d');

    if (dimension) {
        this.canvasDim.copy(dimension);
        this.canvas.width = dimension.x();
        this.canvas.height = dimension.y();
    } else {
        this.canvasDim.copyFromArray([parseInt(this.canvas.width), parseInt(this.canvas.height)]);
    }

    return this.ctx;
};

Core.prototype.clearScreen = function() {
    this.ctx.fillStyle = 'rgb(0,0,0)';
    this.ctx.fillRect(0, 0, this.canvasDim.x(), this.canvasDim.y());
};

Core.prototype.start = function(statsActive) {
    this.statsActive = statsActive;
    Chrono.static.start();

    if (statsActive === true) this.startWithStats();
    else this.startWithoutStats();
};

Core.prototype.startWithStats = function() {
    this.intervalId = setInterval(() => {
        Core.frameTime = Chrono.static.step();
        Core.time += Core.frameTime;

        this.clearScreen();
        this.gameCallback();
        this.drawStats();
    }, this.sleepTime);
};

Core.prototype.startWithoutStats = function() {
    this.intervalId = setInterval(() => {
        Core.frameTime = Chrono.static.step();
        Core.time += Core.frameTime;

        this.clearScreen();
        this.gameCallback();
    }, this.sleepTime);
};

Core.prototype.stop = function() {
    clearInterval(this.intervalId);
};

Core.prototype.restart = function() {
    this.stop();
    this.start(this.statsActive);
};

Core.prototype.updateFps = function(delta) {
    this.fps += delta;
    this.sleepTime = 1000 / this.fps;

    this.restart();
};

Core.prototype.setFps = function(fps) {
    this.fps = fps;
    this.sleepTime = 1000 / fps;

    this.restart();
};

Core.prototype.drawStats = function() {
    this.ctx.font = '12px serif';
    this.ctx.fillStyle = `rgb(${Core.STATS_COLOR.get(Color.RED)},${Core.STATS_COLOR.get(Color.GREEN)},${Core.STATS_COLOR.get(Color.BLUE)})`;
    this.ctx.fillText(`FPS: ${this.fps}`, 10, 15);
    this.ctx.fillText(`Global Time: ${Math.round(Core.time)} ms`, 60, 15);
    this.ctx.fillText(`Frame Time: ${Core.frameTime} ms`, 220, 15);
};

// STATIC SECTION --------------------------------------------------------------------------------------------------
Core.STATS_COLOR = new Color(0x00FF00);

Core._$keyCallbacks = [];
Core._$pressedKeys = { };
Core.time = 0;
Core.frameTime = 0;

Core.AddKeyListener = function(cb) {
    Core._$keyCallbacks.push(cb);
};

Core.IsKeyPressed = function(keyCode) {
    return Core._$pressedKeys[keyCode] === true;
};

Core.GetInstance = function() {
    const core = new Core();

    Core.GetInstance = function() { return core; };
    return core;
};

window.addEventListener('keydown', (event) => {
    Core._$pressedKeys[event.keyCode] = true;
});

window.addEventListener('keyup', (event) => {
    Core._$pressedKeys[event.keyCode] = false;
    Core._$keyCallbacks.forEach(cb => cb(event.keyCode));
});

window.Core = Core;
