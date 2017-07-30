"use strict";
import GameStatus from "../Game"

export default class Pj {

    constructor() {
        this.position       = Vec2.Zero;
        this.size           = Vec2.One;
        this.rotation       = 0;
        this.normal         = Vec2.StdNormal;
        this.color          = new Color(0xAA4411);
        this.direction      = new Vec2([0, 0]);
        this.velocity       = 500;
        this.speedRotation  = 5;

        this.ctx            = Core.Instance.Ctx;
        this.canvasDim      = Core.Instance.CanvasDim;
    }

    configure(position, size) {
        this.position.copy(position);
        this.size.copy(size);
    }

    update() {
        // Rotate if needed
        if (Core.IsKeyPressed(KeyCodes.A) && Core.IsKeyPressed(KeyCodes.D));
        else if (Core.IsKeyPressed(KeyCodes.A)) this.rotation += this.speedRotation;
        else if (Core.IsKeyPressed(KeyCodes.D)) this.rotation -= this.speedRotation;

        // Recalculate normals
        this.normal.copy(Vec2.GetNormalRotated(this.rotation));

        // Set direction vector
        if (Core.IsKeyPressed(KeyCodes.E) && Core.IsKeyPressed(KeyCodes.Q)) this.direction.y = 0;
        else if (Core.IsKeyPressed(KeyCodes.E)) this.direction.y = 1;
        else if (Core.IsKeyPressed(KeyCodes.Q)) this.direction.y = -1;
        else this.direction.y = 0;

        // Move
        this.position.increment(Vec2.Y, this.direction.y * this.velocity * Core.FrameTime / 1000);

        if (this.position.y < 0) this.position.y = 0;
        else if (this.position.y + this.size.y > this.canvasDim.y) this.position.y = this.canvasDim.y - this.size.y;
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

};
