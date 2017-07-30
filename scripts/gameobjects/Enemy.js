"use strict";
import GameStatus from "../Game"

export default class Enemy {

    constructor() {
        this.position   = Vec2.Zero;
        this.size       = Vec2.One;
        this.rotation   = 0;
        this.normal     = Vec2.StdNormal;
        this.color      = new Color(0x00FF00);
        this.velocity   = new Vec2([0, 500]);
        this.ctx        = Core.Instance.Ctx;
    }

    configure(position, size) {
        this.position.copy(position);
        this.size.copy(size);
    }

    update() {
        this.normal.copy(Vec2.GetNormalRotated(this.rotation));
    }

    draw() {
        this.ctx.fillStyle = `rgb(${this.color.Red},${this.color.Green},${this.color.Blue})`;
        this.ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);

        if (GameStatus.MustDrawInfo) this.drawNormal();
    }

    drawNormal() {
        let bx = this.position.x + this.size.x / 2;
        let by = this.position.y + this.size.y / 2;

        this.ctx.strokeStyle = '#FFFF00';
        this.ctx.beginPath();
        this.ctx.moveTo(bx, by);
        this.ctx.lineTo(bx + this.normal.x * 50, by + this.normal.y * 50);
        this.ctx.stroke();
    }

    set Color(value) {
        if (!value) {
            this.color.change(0x000000);
            return;
        }

        this.color.change(typeof value === 'string' ? parseInt(value) : value);
    }

    set Rotation(value) { this.rotation = value }

    get Rotation() { return this.rotation }

}
