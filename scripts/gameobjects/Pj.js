"use strict";
export default class Pj {

    constructor() {
        this.position   = Vec2.Zero;
        this.size       = Vec2.One;
        this.color      = new Color(0xAA4411);
        this.direction  = new Vec2([0, 0]);
        this.velocity   = 500;

        this.ctx = Core.Instance.Ctx;
        this.canvasDim = Core.Instance.CanvasDim;
    }

    configure(position, size) {
        this.position.copy(position);
        this.size.copy(size);
    }

    update() {
        if (Core.IsKeyPressed(KeyCodes.E) && Core.IsKeyPressed(KeyCodes.Q)) this.direction.y = 0;
        else if (Core.IsKeyPressed(KeyCodes.E)) this.direction.y = 1;
        else if (Core.IsKeyPressed(KeyCodes.Q)) this.direction.y = -1;
        else this.direction.y = 0;

        this.position.increment(Vec2.Y, this.direction.y * this.velocity * Core.FrameTime / 1000);

        if (this.position.y < 0) this.position.y = 0;
        else if (this.position.y + this.size.y > this.canvasDim.y) this.position.y = this.canvasDim.y - this.size.y;
    }

    draw() {
        this.ctx.fillStyle = `rgb(${this.color.get(Color.RED)},${this.color.get(Color.GREEN)},${this.color.get(Color.BLUE)})`;
        this.ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    setColor(hexColor) {
        if (!hexColor) {
            this.color.set(0x000000);
            return;
        }

        this.color.set(typeof hexColor === 'string' ? parseInt(hexColor) : hexColor);
    }

};
