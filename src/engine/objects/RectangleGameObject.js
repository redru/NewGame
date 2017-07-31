import Core         from "../Core"
import GameObject   from "./GameObject"
import Color        from "../various/Color";
import Logger       from "../modules/Logger";

export default class RectangleGameObject extends GameObject {

    constructor() {
        super();
        this.__$color   = new Color(0xFF0000);
        this.__$ctx     = Core.Instance.Ctx;
    }

    update() { }

    draw() {
        this.__$ctx.fillStyle = `rgb(${this.__$color.Red},${this.__$color.Green},${this.__$color.Blue})`;
        this.__$ctx.fillRect(this.Position.X, this.Position.Y, this.Size.X, this.Size.Y);

        if (Core.Instance.StatsActive) {
            this.Collider.draw();
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

    onCollision(collider) {

    }

    set Color(value) { this.__$color.change(value) }

    get Color() { return this.__$color }

}
