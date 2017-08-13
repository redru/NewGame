"use strict";
import Chrono               from "./modules/Chrono"
import {Vec2}               from "./modules/Geometry2D"
import GameObjectLoader     from "./modules/GameObjectLoader"
import GameStorage          from "./modules/GameStorage";
import Logger               from "./modules/Logger"
import RectangleGameObject  from "./objects/RectangleGameObject"
import CollisionSystem      from "./collisions/CollisionSystem"
import Color                from "./various/Color"
import CubeExplosion        from "./animations/CubeExplosion";

export default class Core {

    constructor() {
        this.canvas         = null;
        this._ctx           = null;
        this._canvasDim     = Vec2.Zero;
        this._statsActive   = false;
        this._clearColor    = 'black';
        this.fps            = 30;
        this.sleepTime      = 1000 / this.fps;
        this.intervalId     = -1;
        this.gameCallback   = () => { };

        window.addEventListener('keydown', (event) => {
            Core._pressedKeys[event.keyCode] = true;
        });

        window.addEventListener('keyup', (event) => {
            Core._pressedKeys[event.keyCode] = false;
            Core._keyCallbacks.forEach(cb => cb(event.keyCode));
        });
    }

    /**
     *
     * @param {Object} configuration
     * @param {number} configuration.fps
     * @param {number} [configuration.sleepTime]
     */
    initialize(configuration) {
        Logger.InitializeLogArea();

        this.fps = configuration.fps;
        this.sleepTime = configuration.sleepTime ? configuration.sleepTime : 1000 / configuration.fps;

        GameObjectLoader.RegisterObjects(['RectangleGameObject', 'CubeExplosion'], [RectangleGameObject, CubeExplosion]);

        Logger.Append(`[Core] Initialized: ${this.fps} FPS`);
    }

    initGraphics(target, dimension) {
        this.canvas = document.getElementById(target ? target : '2DBoard');
        this._ctx = this.canvas.getContext('2d');
        // this._ctx.imageSmoothingQuality = 'High';
        this._ctx.imageSmoothingEnabled = false;

        if (dimension) {
            this._canvasDim.copy(dimension);
            this.canvas.width = dimension.X;
            this.canvas.height = dimension.Y;
        } else {
            this._canvasDim.copyFromArray([parseInt(this.canvas.width), parseInt(this.canvas.height)]);
        }

        Logger.Append(`[Core] Graphics initialized: Canvas [${this._canvasDim.X}, ${this._canvasDim.Y}]`);
        return this._ctx;
    }

    clearScreen() {
        this._ctx.fillStyle = this._clearColor;
        this._ctx.fillRect(0, 0, this._canvasDim.X, this._canvasDim.Y);
    }

    start(statsActive) {
        if (statsActive !== undefined) this._statsActive = (statsActive === true);
        Chrono.static.start();

        this.intervalId = setInterval(() => {
            Core.FrameTime = Chrono.static.step();
            Core.DeltaTime = Core.FrameTime / 1000;
            Core.Time += Core.FrameTime;

            this.clearScreen();

            // CollisionSystem.checkCollision();
            this.gameCallback();
            if (this._statsActive) this.drawStats();
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
        this._ctx.font = '12px serif';
        this._ctx.fillStyle = `rgb(${Core.StatsColor.Red},${Core.StatsColor.Green},${Core.StatsColor.Blue})`;
        this._ctx.fillText(`FPS: ${this.fps}`, 10, 15);
        this._ctx.fillText(`Global Time: ${Math.round(Core.Time)} ms`, 60, 15);
        this._ctx.fillText(`Frame Time: ${Core.FrameTime} ms`, 220, 15);
    }

    set Ctx(value) { this._ctx = value }

    get Ctx() { return this._ctx }

    set CanvasDim(value) { this._canvasDim = value }

    get CanvasDim() { return this._canvasDim }

    set StatsActive(value) { this._statsActive = value }

    get StatsActive() { return this._statsActive }

    set ClearColor(value) { this._clearColor = value }

    get ClearColor() { return this._clearColor }

    static AddKeyListener(cb) {
        Core._keyCallbacks.push(cb);
    }

    static IsKeyPressed(keyCode) {
        return Core._pressedKeys[keyCode] === true;
    }

    static get Instance() { return Core._instance }

    static get GameStorage() { return Core._gameStorage }

    static get CollisionSystem() { return Core._collisionSystem }

    static get GameObjectLoader() { return Core._gameObjectLoader }

    static set Time(value) { Core._time = value }

    static get Time() { return Core._time }

    static set FrameTime(value) { Core._frameTime = value }

    static get FrameTime() { return Core._frameTime }

    static set DeltaTime(value) { Core._deltaTime = value }

    static get DeltaTime() { return Core._deltaTime }

    static get StatsColor() { return Core._statsColor }
}

Core._statsColor        = new Color(0xFFFFFF);
Core._instance          = new Core();
Core._gameStorage       = GameStorage;
Core._collisionSystem   = CollisionSystem.Instance;
Core._gameObjectLoader  = GameObjectLoader;
Core._time              = 0;
Core._frameTime         = 0;
Core._deltaTime         = 0;
Core._keyCallbacks      = [];
Core._pressedKeys       = { };
