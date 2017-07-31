"use strict";
import GameStatus from "../Game"

export default class Enemy {

    constructor() {
        this.__$id          = -1;
        this.__$name         = '';
        this.__$position    = Vec2.Zero;
        this.__$size        = Vec2.One;
        this.__$rotation    = 0;
        this.normal         = Vec2.StdNormal;
        this.color          = new Color(0x00FF00);
        this.velocity       = new Vec2([0, 500]);
        this.ctx            = Core.Instance.Ctx;
    }

    configure(position, size) {
        this.__$position.copy(position);
        this.__$size.copy(size);
    }

    update() {
        this.normal.copy(Vec2.GetNormalRotated(this.__$rotation));
    }

    draw() {
        this.ctx.fillStyle = `rgb(${this.color.Red},${this.color.Green},${this.color.Blue})`;
        this.ctx.fillRect(this.__$position.X, this.__$position.Y, this.__$size.X, this.__$size.Y);

        if (GameStatus.MustDrawInfo) this.drawNormal();
    }

    drawNormal() {
        let bx = this.__$position.X + this.__$size.X / 2;
        let by = this.__$position.Y + this.__$size.Y / 2;

        this.ctx.strokeStyle = '#FFFF00';
        this.ctx.beginPath();
        this.ctx.moveTo(bx, by);
        this.ctx.lineTo(bx + this.normal.X * 50, by + this.normal.Y * 50);
        this.ctx.stroke();
    }

    set Id(value) { this.__$id = value }

    get Id() { return this.__$id }

    set Name(value) { this.__$name = value }

    get Name() { return this.__$name }

    set Color(value) {
        if (!value) {
            this.color.change(0x000000);
            return;
        }

        this.color.change(typeof value === 'string' ? parseInt(value) : value);
    }

    set Position(value) { this.__$position = value }

    get Position() { return this.__$position }

    set Size(value) { this.__$size = value }

    get Size() { return this.__$size }

    set Rotation(value) { this.__$rotation = value }

    get Rotation() { return this.__$rotation }

}
