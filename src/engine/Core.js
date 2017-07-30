"use strict"
import Color    from "./various/Color"
import { Vec2 } from "./modules/Geometry2D"

export default class Core {

    constructor() {
        this.canvas         = null;
        this.__$ctx          = null;
        this.__$canvasDim    = Vec2.Zero;
        this.fps            = 30;
        this.sleepTime      = 1000 / this.fps;
        this.intervalId     = -1;
        this.gameCallback   = () => { };

        window.addEventListener('keydown', (event) => {
            Core.__$pressedKeys[event.keyCode] = true;
        });

        window.addEventListener('keyup', (event) => {
            Core.__$pressedKeys[event.keyCode] = false;
            Core.__$keyCallbacks.forEach(cb => cb(event.keyCode));
        });
    }

    /**
     *
     * @param {Object} configuration
     * @param {number} configuration.fps
     * @param {number} [configuration.sleepTime]
     */
    configure(configuration) {
        this.fps = configuration.fps;
        this.sleepTime = configuration.sleepTime ? configuration.sleepTime : 1000 / configuration.fps;
    }

    initGraphics(target, dimension) {
        this.canvas = document.getElementById(target ? target : '2DBoard');
        this.__$ctx = this.canvas.getContext('2d');

        if (dimension) {
            this.__$canvasDim.copy(dimension);
            this.canvas.width = dimension.x;
            this.canvas.height = dimension.y;
        } else {
            this.__$canvasDim.copyFromArray([parseInt(this.canvas.width), parseInt(this.canvas.height)]);
        }

        return this.__$ctx;
    }

    clearScreen() {
        this.__$ctx.fillStyle = 'rgb(0,0,0)';
        this.__$ctx.fillRect(0, 0, this.__$canvasDim.x, this.__$canvasDim.y);
    }

    start(statsActive) {
        this.statsActive = statsActive;
        Chrono.static.start();

        if (statsActive === true) this.startWithStats();
        else this.startWithoutStats();
    }

    startWithStats() {
        this.intervalId = setInterval(() => {
            Core.FrameTime = Chrono.static.step();
            Core.Time += Core.FrameTime;

            this.clearScreen();
            this.gameCallback();
            this.drawStats();
        }, this.sleepTime);
    }

    startWithoutStats() {
        this.intervalId = setInterval(() => {
            Core.FrameTime = Chrono.static.step();
            Core.Time += Core.FrameTime;

            this.clearScreen();
            this.gameCallback();
        }, this.sleepTime);
    }

    stop() {
        clearInterval(this.intervalId);
    }

    restart(statsActive) {
        this.stop();

        if (statsActive === undefined) statsActive = this.statsActive;
        else this.statsActive = (statsActive === true);

        this.start(this.statsActive);
    }

    updateFps(delta) {
        this.fps += delta;
        this.sleepTime = 1000 / this.fps;

        this.restart();
    }

    setFps(fps) {
        this.fps = fps;
        this.sleepTime = 1000 / fps;

        this.restart();
    }

    drawStats() {
        this.__$ctx.font = '12px serif';
        this.__$ctx.fillStyle = `rgb(${Core.StatsColor.Red},${Core.StatsColor.Green},${Core.StatsColor.Blue})`;
        this.__$ctx.fillText(`FPS: ${this.fps}`, 10, 15);
        this.__$ctx.fillText(`Global Time: ${Math.round(Core.Time)} ms`, 60, 15);
        this.__$ctx.fillText(`Frame Time: ${Core.FrameTime} ms`, 220, 15);
    }

    set Ctx(value) { this.__$ctx = value }

    get Ctx() { return this.__$ctx }

    set CanvasDim(value) { this.__$canvasDim = value }

    get CanvasDim() { return this.__$canvasDim }

    static AddKeyListener(cb) {
        Core.__$keyCallbacks.push(cb);
    }

    static IsKeyPressed(keyCode) {
        return Core.__$pressedKeys[keyCode] === true;
    }

    static get Instance() { return Core.__$instance }

    static set Time(value) { Core.__$time = value }

    static get Time() { return Core.__$time }

    static set FrameTime(value) { Core.__$frameTime = value }

    static get FrameTime() { return Core.__$frameTime }

    static get StatsColor() { return Core.__$statsColor }
}

Core.__$statsColor      = new Color(0x00FF00);
Core.__$instance        = new Core();
Core.__$time            = 0;
Core.__$frameTime       = 0;
Core.__$keyCallbacks    = [];
Core.__$pressedKeys     = { };
