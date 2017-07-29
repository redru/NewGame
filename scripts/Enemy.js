"use strict";
let ctx = null;
let canvasDim = null;

export default function Enemy() {
    this.position   = Vec2.Zero();
    this.size       = Vec2.One();
    this.color      = new Color(0x00FF00);
    this.velocity   = new Vec2([0, 500]);

    ctx = Core.GetInstance().ctx;
    canvasDim = Core.GetInstance().canvasDim;
};

Enemy.prototype.configure = function(position, size) {
    this.position.copy(position);
    this.size.copy(size);
};

Enemy.prototype.setColor = function(hexColor) {
    this.color.set(hexColor);
};

Enemy.prototype.update = function() {

};

Enemy.prototype.draw = function() {
    ctx.fillStyle = `rgb(${this.color.get(Color.RED)},${this.color.get(Color.GREEN)},${this.color.get(Color.BLUE)})`;
    ctx.fillRect(this.position.x(), this.position.y(), this.size.x(), this.size.y());
};

window.Enemy = Enemy;
