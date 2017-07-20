(function (global) {
    "use strict";

    let ctx = null;
    let canvasDim = null;

    const Disk = function() {
        this.position   = Vec2.Zero();
        this.size       = Vec2.One();
        this.color      = new Color(0x0000FF);
        this.velocity   = new Vec2([0, 500]);

        ctx = Core.GetInstance().ctx;
        canvasDim = Core.GetInstance().canvasDim;
    };

    Disk.prototype.configure = function(position, size) {
        this.position = position;
        this.size = size;
    };

    Disk.prototype.setColor = function(hexColor) {
        this.color.set(hexColor);
    };

    Disk.prototype.update = function() {

    };

    Disk.prototype.draw = function() {
        ctx.fillStyle = `rgb(${this.color.get(Color.RED)},${this.color.get(Color.GREEN)},${this.color.get(Color.BLUE)})`;
        ctx.beginPath();
        ctx.arc(this.position.x(), this.position.y(), 15, 0, 2 * Math.PI);
        ctx.fill();
    };

    global.Disk = Disk;

})(window);
