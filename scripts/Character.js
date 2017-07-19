(function (global) {
    "use strict";

    let ctx = null;
    let canvasDim = null;

    const Character = function() {
        this.position   = Vec2.Zero();
        this.size       = Vec2.Zero();
        this.color      = new Color(0xAA4411);
        this.velocity   = new Vec2([0, 500]);

        ctx = Core.GetInstance().ctx;
        canvasDim = Core.GetInstance().canvasDim;
    };

    Character.prototype.configure = function(position, size) {
        this.position = position;
        this.size = size;
    };

    Character.prototype.setColor = function(hexColor) {
        this.color.set(hexColor);
    };

    Character.prototype.update = function() {
        if (Core.IsKeyPressed(KeyCodes.E)) this.position.increment(Vec2.Y, this.velocity.y() * Core.frameTime / 1000);
        if (Core.IsKeyPressed(KeyCodes.Q)) this.position.increment(Vec2.Y, -(this.velocity.y() * Core.frameTime / 1000));

        if (this.position.y() < 0) this.position.y(0);
        else if (this.position.y() + this.size.y() > canvasDim.y()) this.position.y(canvasDim.y() - this.size.y());
    };

    Character.prototype.draw = function() {
        ctx.fillStyle = `rgb(${this.color.get(Color.RED)},${this.color.get(Color.GREEN)},${this.color.get(Color.BLUE)})`;
        ctx.fillRect(this.position.x(), this.position.y(), this.size.x(), this.size.y());
    };

    global.Character = Character;

})(window);
