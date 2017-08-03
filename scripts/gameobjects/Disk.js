"use strict";
import GameStatus from "../Game"

export default class Disk {

    constructor() {
        this.__$id              = -1;
        this.__$name            = '';
        this.__$position        = Vec2.Zero;
        this.__$size            = Vec2.One;
        this.__$radius          = 0;
        this.__$rotation        = Math.random() * 360;
        this.__$normal          = Vec2.GetNormal(this.__$rotation);
        this.__$color           = new Color(0x0055FF);
        this.__$direction       = Vec2.Copy(this.__$normal);
        this.__$velocity        = 250;
        this.__$rotationSpeed   = 100;
        this.__$collider        = null;

        this.__$ballImage       = document.getElementById('ball');
        this.__$animationRot    = 0;

        this.__$ctx             = Core.Instance.Ctx;
    }

    attachCollider(collider) {
        this.__$collider = collider;
        collider.attachObject(this);
    }

    onCollision(object) {

    }

    update() {
        const oldPosition = Vec2.Copy(this.__$position);
        this.__$position.increment(this.__$direction.X * this.__$velocity * Core.DeltaTime, this.__$direction.Y * this.__$velocity * Core.DeltaTime);

        const collisions = this.__$collider.getCollisions();

        if (collisions.length !== 0) {
            this.__$position.copy(oldPosition);

            collisions.forEach(object => {
                if ((object.Group === 'WALL' || object.Group === 'PLAYER') && object.Normal) {
                    this.__$rotation = Vec2.Reflect(this.__$direction, object.Normal).toRotation() + Math.random() * 20 - 10;

                    this.__$rotation = Util2D.AdjustRotation(this.__$rotation);

                    this.__$direction = Vec2.GetNormal(this.__$rotation);
                    this.__$normal.copy(this.__$direction);
                }
            });
        }

        this.__$animationRot += Core.DeltaTime * 200;
        if (this.__$animationRot >= 360) this.__$animationRot = 0;
    }

    draw() {
        /*this.__$ctx.fillStyle = `rgb(${this.__$color.Red},${this.__$color.Green},${this.__$color.Blue})`;
        this.__$ctx.beginPath();
        this.__$ctx.arc(this.__$position.X + this.__$radius, this.__$position.Y + this.__$radius, this.__$radius, 0, 2 * Math.PI);
        this.__$ctx.fill();*/
        this.__$ctx.save();
        this.__$ctx.translate(this.__$position.X + this.__$size.X / 2, this.__$position.Y + this.__$size.Y / 2);
        this.__$ctx.rotate(Util2D.ToRadians(this.__$animationRot));
        this.__$ctx.drawImage(this.__$ballImage, this.__$size.X / -2, this.__$size.Y / -2, this.__$size.X, this.__$size.Y);
        this.__$ctx.restore();

        if (GameStatus.MustDrawInfo) {
            this.__$collider.draw();
            this.drawNormal();
        }
    }

    drawNormal() {
        let bx = this.__$position.X + this.__$size.X / 2;
        let by = this.__$position.Y + this.__$size.Y / 2;

        this.__$ctx.strokeStyle = '#FFFF00';
        this.__$ctx.beginPath();
        this.__$ctx.moveTo(bx, by);
        this.__$ctx.lineTo(bx + this.__$normal.X * 50, by + this.__$normal.Y * 50);
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

    set Size(value) {
        this.__$size.copy(value);
        this.__$radius = value.Width / 2;
    }

    get Size() { return this.__$size }

    get Radius() { return this.__$radius }

    set Rotation(value) { this.__$rotation = value }

    get Rotation() { return this.__$rotation }

    set Normal(value) { this.__$normal.copy(value) }

    get Normal() { return this.__$normal }

    set Collider(value) { this.__$collider = value }

    get Collider() { return this.__$collider }

}
