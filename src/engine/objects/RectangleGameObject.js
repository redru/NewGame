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

    draw() {
        this.__$ctx.fillStyle = `rgb(${this.__$color.Red},${this.__$color.Green},${this.__$color.Blue})`;
        this.__$ctx.fillRect(this.Position.X, this.Position.Y, this.Size.X, this.Size.Y);

        if (Core.Instance.StatsActive)
            this.drawColliders();
    }

    drawColliders() {
        this.Colliders.forEach(collider => collider.draw());
    }

    update() { }

}
