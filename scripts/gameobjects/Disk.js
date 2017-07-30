"use strict";
export default class Disk {

    constructor() {
        this.position   = Vec2.Zero;
        this.size       = Vec2.One;
        this.rotation   = 0;
        this.normal     = Vec2.StdNormal;
        this.color      = new Color(0x0000FF);
        this.velocity   = new Vec2([0, 500]);
        this.ctx        = Core.Instance.Ctx;
    }

    configure(position, size) {
        this.position = position;
        this.size = size;
    }

    update() {

    }

    draw() {
        this.ctx.fillStyle = `rgb(${this.color.Red},${this.color.Green},${this.color.Blue})`;
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, 15, 0, 2 * Math.PI);
        this.ctx.fill();
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
