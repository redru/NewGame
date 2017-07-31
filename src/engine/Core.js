"use strict";
import { Vec2 }             from "./modules/Geometry2D"
import GameObjectLoader     from "./modules/GameObjectLoader"
import Logger               from "./modules/Logger"
import RectangleGameObject  from "./objects/RectangleGameObject"
import CollisionSystem      from "./collisions/CollisionSystem"
import Color                from "./various/Color"

export default class Core {

    constructor() {
        this.canvas         = null;
        this.__$ctx         = null;
        this.__$canvasDim   = Vec2.Zero;
        this.__$statsActive = false;
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
        Logger.InitializeLogArea();

        this.fps = configuration.fps;
        this.sleepTime = configuration.sleepTime ? configuration.sleepTime : 1000 / configuration.fps;

        Logger.Append(`[Core] Initialized: ${this.fps} FPS`);
    }

    initGraphics(target, dimension) {
        this.canvas = document.getElementById(target ? target : '2DBoard');
        this.__$ctx = this.canvas.getContext('2d');
        // this.__$ctx.imageSmoothingQuality = 'High';
        this.__$ctx.imageSmoothingEnabled = false;

        if (dimension) {
            this.__$canvasDim.copy(dimension);
            this.canvas.width = dimension.X;
            this.canvas.height = dimension.Y;
        } else {
            this.__$canvasDim.copyFromArray([parseInt(this.canvas.width), parseInt(this.canvas.height)]);
        }

        Logger.Append(`[Core] Graphics initialized: Canvas [${this.__$canvasDim.X}, ${this.__$canvasDim.Y}]`);
        return this.__$ctx;
    }

    loadObjects() {
        GameObjectLoader.RegisterObjects(['RectangleGameObject'], [RectangleGameObject]);
    }

    clearScreen() {
        this.__$ctx.fillStyle = 'rgb(0,0,0)';
        this.__$ctx.fillRect(0, 0, this.__$canvasDim.X, this.__$canvasDim.Y);
    }

    start(statsActive) {
        if (statsActive !== undefined) this.__$statsActive = (statsActive === true);
        Chrono.static.start();

        this.intervalId = setInterval(() => {
            Core.FrameTime = Chrono.static.step();
            Core.DeltaTime = Core.FrameTime / 1000;
            Core.Time += Core.FrameTime;

            this.clearScreen();

            CollisionSystem.Instance.checkCollision();
            this.gameCallback();
            if (this.__$statsActive) this.drawStats();
        }, this.sleepTime);
    }

    stop() {
        clearInterval(this.intervalId);
    }

    restart(statsActive) {
        this.stop();
        this.start(statsActive);
    }

    updateFps(delta) {
        if (this.fps + delta < 0 || this.fps + delta > 120) return;

        this.fps += delta;
        this.sleepTime = 1000 / this.fps;
        Logger.Append(`[Core] FPS: ${this.fps}`);

        this.restart();
    }

    setFps(fps) {
        if (fps < 0 || fps > 120) return;

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

    set StatsActive(value) { this.__$statsActive = value }

    get StatsActive() { return this.__$statsActive }

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

    static set DeltaTime(value) { Core.__$deltaTime = value }

    static get DeltaTime() { return Core.__$deltaTime }

    static get StatsColor() { return Core.__$statsColor }
}

Core.__$statsColor      = new Color(0x00FF00);
Core.__$instance        = new Core();
Core.__$time            = 0;
Core.__$frameTime       = 0;
Core.__$deltaTime       = 0;
Core.__$keyCallbacks    = [];
Core.__$pressedKeys     = { };
