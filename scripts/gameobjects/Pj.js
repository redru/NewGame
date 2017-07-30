"use strict";
import GameStatus from "../Game"

export default class Pj {

    constructor() {
        this.__$position    = Vec2.Zero;
        this.__$size        = Vec2.One;
        this.__$rotation    = 0;
        this.normal         = Vec2.StdNormal;
        this.color          = new Color(0xAA4411);
        this.direction      = new Vec2([0, 0]);
        this.velocity       = 500;
        this.speedRotation  = 100;
        this.__$colliders   = [];

        this.ctx            = Core.Instance.Ctx;
        this.canvasDim      = Core.Instance.CanvasDim;

        this.attachCollider(new BoundingBox());
    }

    configure(position, size) {
        this.__$position.copy(position);
        this.__$size.copy(size);
    }

    attachCollider(collider) {
        this.__$colliders.push(collider);
        collider.attachObject(this);
    }

    update() {
        // Rotate if needed
        if (Core.IsKeyPressed(KeyCodes.A) && Core.IsKeyPressed(KeyCodes.D));
        else if (Core.IsKeyPressed(KeyCodes.A)) this.__$rotation += (this.speedRotation * Core.DeltaTime);
        else if (Core.IsKeyPressed(KeyCodes.D)) this.__$rotation -= (this.speedRotation * Core.DeltaTime);

        if (this.__$rotation >= 360) this.__$rotation -= 360;
        else if (this.__$rotation < 0) this.__$rotation += 360;

        // Recalculate normals
        this.normal.copy(Vec2.GetNormalRotated(this.__$rotation));

        // Set direction vector
        if (Core.IsKeyPressed(KeyCodes.E) && Core.IsKeyPressed(KeyCodes.Q)) this.direction.Y = 0;
        else if (Core.IsKeyPressed(KeyCodes.E)) this.direction.Y = 1;
        else if (Core.IsKeyPressed(KeyCodes.Q)) this.direction.Y = -1;
        else this.direction.Y = 0;

        // Move
        this.__$position.increment(0, this.direction.Y * this.velocity * Core.DeltaTime);

        if (this.__$position.Y < 0) this.__$position.Y = 0;
        else if (this.__$position.Y + this.__$size.Y > this.canvasDim.Y) this.__$position.Y = this.canvasDim.Y - this.__$size.Y;
    }

    draw() {
        this.ctx.fillStyle = `rgb(${this.color.Red},${this.color.Green},${this.color.Blue})`;
        this.ctx.fillRect(this.__$position.X, this.__$position.Y, this.__$size.X, this.__$size.Y);

        if (GameStatus.MustDrawInfo) {
            this.drawColliders();
            this.drawNormal();
        }
    }

    drawNormal() {
        let bx = this.__$position.X + this.__$size.X / 2;
        let by = this.__$position.Y + this.__$size.Y / 2;

        this.ctx.strokeStyle = '#FFFF00';
        this.ctx.beginPath();
        this.ctx.moveTo(bx, by);
        this.ctx.lineTo(bx + this.normal.X * 50, by + this.normal.Y * -50);
        this.ctx.stroke();
    }

    drawColliders() {
        this.__$colliders.forEach(collider => collider.draw());
    }

    set Color(value) {
        if (!value) {
            this.color.change(0x000000);
            return;
        }

        this.color.change(typeof value === 'string' ? parseInt(value) : value);
    }

    set Position(value) { this.__$position.copy(value) }

    get Position() { return this.__$position }

    set Size(value) { this.__$size.copy(value) }

    get Size() { return this.__$size }

    set Rotation(value) { this.__$rotation = value }

    get Rotation() { return this.__$rotation }

};
