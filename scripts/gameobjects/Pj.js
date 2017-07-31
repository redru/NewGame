"use strict";
import GameStatus from "../Game"

export default class Pj {

    constructor() {
        this.__$id              = -1;
        this.__$name            = '';
        this.__$position        = Vec2.Zero;
        this.__$size            = Vec2.One;
        this.__$rotation        = 0;
        this.__$normal          = Vec2.StdNormal;
        this.__$color           = new Color(0xAA4411);
        this.__$direction       = new Vec2([0, 0]);
        this.__$velocity        = 500;
        this.__$rotationSpeed   = 200;
        this.__$collider        = null;

        this.__$ctx             = Core.Instance.Ctx;
        this.__$canvasDim       = Core.Instance.CanvasDim;
    }

    attachCollider(collider) {
        this.__$collider = collider;
        collider.attachObject(this);
    }

    onCollision(collider) { }

    update() {
        // Rotate if needed
        if (Core.IsKeyPressed(KeyCodes.A) && Core.IsKeyPressed(KeyCodes.D));
        else if (Core.IsKeyPressed(KeyCodes.A)) this.__$rotation += (this.__$rotationSpeed * Core.DeltaTime);
        else if (Core.IsKeyPressed(KeyCodes.D)) this.__$rotation -= (this.__$rotationSpeed * Core.DeltaTime);

        if (this.__$rotation >= 360) this.__$rotation -= 360;
        else if (this.__$rotation < 0) this.__$rotation += 360;

        // Recalculate normals
        this.__$normal.copy(Vec2.GetNormalRotated(this.__$rotation));

        // Set direction vector
        if (Core.IsKeyPressed(KeyCodes.E) && Core.IsKeyPressed(KeyCodes.Q)) this.__$direction.Y = 0;
        else if (Core.IsKeyPressed(KeyCodes.E) && !this.__$collider.collidesWith('WALL_BOTTOM')) this.__$direction.Y = 1;
        else if (Core.IsKeyPressed(KeyCodes.Q) && !this.__$collider.collidesWith('WALL_TOP')) this.__$direction.Y = -1;
        else this.__$direction.Y = 0;

        // Move
        this.__$position.increment(0, this.__$direction.Y * this.__$velocity * Core.DeltaTime);
    }

    draw() {
        this.__$ctx.save();
        this.__$ctx.translate(this.__$position.X + this.__$size.X / 2, this.__$position.Y + this.__$size.Y / 2);
        this.__$ctx.rotate(-this.__$rotation * Math.PI / 180); // Negative rotation to rotate counterclockwise
        this.__$ctx.fillStyle = `rgb(${this.__$color.Red},${this.__$color.Green},${this.__$color.Blue})`;
        this.__$ctx.fillRect(this.__$size.X / -2, this.__$size.Y / -2, this.__$size.X, this.__$size.Y);
        this.__$ctx.restore();

        if (GameStatus.MustDrawInfo) {
            this.__$collider.draw();
            this.drawNormal();
            this.drawDirection();
        }
    }

    drawNormal() {
        let bx = this.__$position.X + this.__$size.X / 2;
        let by = this.__$position.Y + this.__$size.Y / 2;

        this.__$ctx.strokeStyle = '#FFFF00';
        this.__$ctx.beginPath();
        this.__$ctx.moveTo(bx, by);
        this.__$ctx.lineTo(bx + this.__$normal.X * 50, by + this.__$normal.Y * -50);
        this.__$ctx.stroke();
    }

    drawDirection() {
        let bx = this.__$position.X + this.__$size.X / 2;
        let by = this.__$position.Y + this.__$size.Y / 2;

        this.__$ctx.strokeStyle = '#00FF00';
        this.__$ctx.beginPath();
        this.__$ctx.moveTo(bx, by);
        this.__$ctx.lineTo(bx + this.__$direction.X * this.__$velocity * 0.25, by + this.__$direction.Y * this.__$velocity * 0.25);
        this.__$ctx.stroke();
    }

    set Id(value) { this.__$id = value }

    get Id() { return this.__$id }

    set Name(value) { this.__$name = value }

    get Name() { return this.__$name }

    set Color(value) {
        if (!value) {
            this.__$color.change(0x000000);
            return;
        }

        this.__$color.change(typeof value === 'string' ? parseInt(value) : value);
    }

    get Color() { return this.__$color }

    set Position(value) { this.__$position.copy(value) }

    get Position() { return this.__$position }

    set Size(value) { this.__$size.copy(value) }

    get Size() { return this.__$size }

    set Rotation(value) { this.__$rotation = value }

    get Rotation() { return this.__$rotation }

    set Normal(value) { this.__$normal.copy(value) }

    get Normal() { return this.__$normal }

    set Collider(value) { this.__$collider = value }

    get Collider() { return this.__$collider }

};
