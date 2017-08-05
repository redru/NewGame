"use strict";
import Core             from "../../src/engine/Core"
import Color            from "../../src/engine/various/Color"
import {Vec2, Util2D}   from "../../src/engine/modules/Geometry2D"
import GameStatus       from "../Game"

export default class Enemy {

    constructor() {
        this._id              = -1;
        this._name            = '';
        this._position        = Vec2.Zero;
        this._size            = Vec2.One;
        this._rotation        = 0;
        this._normal             = Vec2.StdNormal;
        this._color           = new Color(0x55AA00);
        this._direction       = new Vec2([0, 0]);
        this._velocity        = 500;
        this._rotationSpeed   = 100;
        this._colliders       = [];

        this._ctx             = Core.Instance.Ctx;
    }

    update() {
        this._normal.copy(Vec2.GetNormal(this._rotation));
    }

    draw() {
        this._ctx.fillStyle = `rgb(${this._color.Red},${this._color.Green},${this._color.Blue})`;
        this._ctx.fillRect(this._position.X, this._position.Y, this._size.X, this._size.Y);

        if (GameStatus.MustDrawInfo) this.drawNormal();
    }

    drawNormal() {
        let bx = this._position.X + this._size.X / 2;
        let by = this._position.Y + this._size.Y / 2;

        this._ctx.strokeStyle = '#FFFF00';
        this._ctx.beginPath();
        this._ctx.moveTo(bx, by);
        this._ctx.lineTo(bx + this._normal.X * 50, by + this._normal.Y * 50);
        this._ctx.stroke();
    }

    set Id(value) { this._id = value }

    get Id() { return this._id }

    set Name(value) { this._name = value }

    get Name() { return this._name }

    set Color(value) {
        if (!value) {
            this._color.change(0x000000);
            return;
        }

        this._color.change(typeof value === 'string' ? parseInt(value) : value);
    }

    get Color() { return this._color }

    set Position(value) { this._position = value }

    get Position() { return this._position }

    set Size(value) { this._size = value }

    get Size() { return this._size }

    set Rotation(value) { this._rotation = value }

    get Rotation() { return this._rotation }

    set Normal(value) { this._normal.copy(value) }

    get Normal() { return this._normal }

}
