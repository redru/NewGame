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
        this.__$normal          = Vec2.StdNormal;
        this.__$color           = new Color(0x0055FF);
        this.__$direction       = new Vec2([0, 0]);
        this.__$velocity        = 25;
        this.__$rotationSpeed   = 100;
        this.__$collider        = null;

        this.__$ctx             = Core.Instance.Ctx;
    }

    attachCollider(collider) {
        this.__$collider = collider;
        collider.attachObject(this);
    }

    onCollision(object) {
        console.log(`Disk collided. Old rotation ${this.__$rotation}`);
        if (object.Normal) {
            // v' = 2 * (v . n) * n - v;
            // let reflected = Vec2.MultiplyScalar(object.Normal, Vec2.DotProduct(this.__$direction, object.Normal) * 2);
            // reflected.substractVector(this.__$direction);

            // Vect2 = Vect1 - 2 * WallN * (WallN DOT Vect1)
            let reflected = Vec2.MultiplyScalar(object.Normal, Vec2.DotProduct(this.__$direction, object.Normal) * 2);
            reflected = Vec2.Substract(this.__$direction, reflected);

            // V-=2*Normal_wall*(Normal_wall.V)

            // Retrieve rotation from new direction
            this.__$rotation = Math.atan2(reflected.X, reflected.Y) * 180/ Math.PI;

            if (this.__$rotation < 0) this.__$rotation += 360;
            else if (this.__$rotation >= 360) this.__$rotation -= 360;

            console.log(`New rotation: ${this.__$rotation}`);
        }
    }

    update() {
        this.__$direction.copy(Vec2.GetNormalRotated(this.__$rotation));
        this.__$normal.copy(this.__$direction);

        this.__$position.increment(this.__$direction.X * this.__$velocity * Core.DeltaTime, this.__$direction.Y * this.__$velocity * Core.DeltaTime);
    }

    draw() {
        this.__$ctx.fillStyle = `rgb(${this.__$color.Red},${this.__$color.Green},${this.__$color.Blue})`;
        this.__$ctx.beginPath();
        this.__$ctx.arc(this.__$position.X + this.__$radius, this.__$position.Y + this.__$radius, this.__$radius, 0, 2 * Math.PI);
        this.__$ctx.fill();

        if (GameStatus.MustDrawInfo) {
            this.__$collider.draw();
            this.drawNormal();
        }
    }

    drawNormal() {
        let bx = this.__$position.X;
        let by = this.__$position.Y;

        this.__$ctx.strokeStyle = '#FFFF00';
        this.__$ctx.beginPath();
        this.__$ctx.moveTo(bx, by);
        this.__$ctx.lineTo(bx + this.__$normal.X * 100, by + this.__$normal.Y * 100);
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
