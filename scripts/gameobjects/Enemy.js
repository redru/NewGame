"use strict";
import GameStatus from "../Game"

export default class Enemy {

    constructor() {
        this.__$id              = -1;
        this.__$name            = '';
        this.__$position        = Vec2.Zero;
        this.__$size            = Vec2.One;
        this.__$rotation        = 0;
        this.__$normal             = Vec2.StdNormal;
        this.__$color           = new Color(0x55AA00);
        this.__$direction       = new Vec2([0, 0]);
        this.__$velocity        = 500;
        this.__$rotationSpeed   = 100;
        this.__$colliders       = [];

        this.__$ctx             = Core.Instance.Ctx;
    }

    update() {
        this.__$normal.copy(Vec2.GetNormal(this.__$rotation));
    }

    draw() {
        this.__$ctx.fillStyle = `rgb(${this.__$color.Red},${this.__$color.Green},${this.__$color.Blue})`;
        this.__$ctx.fillRect(this.__$position.X, this.__$position.Y, this.__$size.X, this.__$size.Y);

        if (GameStatus.MustDrawInfo) this.drawNormal();
    }

    drawNormal() {
        let bx = this.__$position.X + this.__$size.X / 2;
        let by = this.__$position.Y + this.__$size.Y / 2;

        this.__$ctx.strokeStyle = '#FFFF00';
        this.__$ctx.beginPath();
        this.__$ctx.moveTo(bx, by);
        this.__$ctx.lineTo(bx + this.__$normal.X * 50, by + this.__$normal.Y * 50);
        this.__$ctx.stroke();
    }

    set Id(value) { this.__$id = value }

    get Id() { return this.__$id }

    set Name(value) { this.__$name = value }

    get Name() { return this.__$name }

    set Color(value) {
        if (!value) {
            this.__$color.change(0x000000);
            return;
        }

        this.__$color.change(typeof value === 'string' ? parseInt(value) : value);
    }

    get Color() { return this.__$color }

    set Position(value) { this.__$position = value }

    get Position() { return this.__$position }

    set Size(value) { this.__$size = value }

    get Size() { return this.__$size }

    set Rotation(value) { this.__$rotation = value }

    get Rotation() { return this.__$rotation }

    set Normal(value) { this.__$normal.copy(value) }

    get Normal() { return this.__$normal }

}
