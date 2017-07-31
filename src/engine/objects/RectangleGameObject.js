import Core         from "../Core"
import GameObject   from "./GameObject"
import BoundingBox  from "../collisions/BoundingBox";
import Color        from "../various/Color";

export default class RectangleGameObject extends GameObject {

    constructor() {
        super();
        this.__$color   = new Color(0xFF0000);
        this.__$ctx     = Core.Instance.Ctx;

        this.attachCollider(new BoundingBox());
    }

    update() { }

    draw() {
        this.__$ctx.fillStyle = `rgb(${this.__$color.Red},${this.__$color.Green},${this.__$color.Blue})`;
        this.__$ctx.fillRect(this.Position.X, this.Position.Y, this.Size.X, this.Size.Y);

        if (Core.Instance.StatsActive) {
            this.drawColliders();
            this.drawNormal();
        }
    }

    drawNormal() {
        let bx = this.Position.X + this.Size.X / 2;
        let by = this.Position.Y + this.Size.Y / 2;

        this.__$ctx.strokeStyle = '#FFFF00';
        this.__$ctx.beginPath();
        this.__$ctx.moveTo(bx, by);
        this.__$ctx.lineTo(bx + this.Normal.X * this.Size.X, by + this.Normal.Y * -this.Size.Y);
        this.__$ctx.stroke();
    }

    drawColliders() {
        this.Colliders.forEach(collider => collider.draw());
    }

    onCollision(collider) {

    }

}
