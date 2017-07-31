"use strict";
import GameStatus from "../Game"

export default class Disk {

    constructor() {
        this.__$id          = -1;
        this.__$name         = '';
        this.__$position    = Vec2.Zero;
        this.__$size        = Vec2.One;
        this.__$rotation    = Math.random() * 360;
        this.normal         = Vec2.StdNormal;
        this.color          = new Color(0x0000FF);
        this.direction      = Vec2.Zero;
        this.velocity       = 1;

        this.ctx            = Core.Instance.Ctx;
    }

    configure(position, size) {
        this.__$position = position;
        this.__$size = size;
    }

    update() {
        this.direction.copy(Vec2.GetNormalRotated(this.__$rotation));
        this.normal.copy(this.direction);

        this.__$position.increment(this.direction.X * this.velocity * Core.DeltaTime, this.direction.Y * this.velocity * Core.DeltaTime);
    }

    draw() {
        this.ctx.fillStyle = `rgb(${this.color.Red},${this.color.Green},${this.color.Blue})`;
        this.ctx.beginPath();
        this.ctx.arc(this.__$position.X, this.__$position.Y, 15, 0, 2 * Math.PI);
        this.ctx.fill();

        if (GameStatus.MustDrawInfo) this.drawNormal();
    }

    drawNormal() {
        let bx = this.__$position.X;
        let by = this.__$position.Y;

        this.ctx.strokeStyle = '#FFFF00';
        this.ctx.beginPath();
        this.ctx.moveTo(bx, by);
        this.ctx.lineTo(bx + this.normal.X * 100, by + this.normal.Y * 100);
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
