"use strict";
let ctx = null;
let canvasDim = null;

export default function Disk() {
    this.position   = Vec2.Zero;
    this.size       = Vec2.One;
    this.color      = new Color(0x0000FF);
    this.velocity   = new Vec2([0, 500]);

    ctx = Core.Instance.Ctx;
    canvasDim = Core.Instance.CanvasDim;
};

Disk.prototype.configure = function(position, size) {
    this.position = position;
    this.size = size;
};

Disk.prototype.setColor = function(hexColor) {
    if (!hexColor) {
        this.color.set(0x000000);
        return;
    }

    this.color.set(typeof hexColor === 'string' ? parseInt(hexColor) : hexColor);
};

Disk.prototype.update = function() {

};

Disk.prototype.draw = function() {
    ctx.fillStyle = `rgb(${this.color.get(Color.RED)},${this.color.get(Color.GREEN)},${this.color.get(Color.BLUE)})`;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 15, 0, 2 * Math.PI);
    ctx.fill();
};

window.Disk = Disk;
