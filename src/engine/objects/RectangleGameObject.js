import Core         from "../Core"
import GameObject   from "./GameObject"
import Color        from "../various/Color";
import Logger       from "../modules/Logger";

export default class RectangleGameObject extends GameObject {

    constructor() {
        super();
        this._color   = new Color(0xFF0000);
        this._ctx     = Core.Instance.Ctx;
    }

    update() { }

    draw() {
        this._ctx.fillStyle = `rgb(${this._color.Red},${this._color.Green},${this._color.Blue})`;
        this._ctx.fillRect(this.Position.X, this.Position.Y, this.Size.X, this.Size.Y);

        if (Core.Instance.StatsActive) {
            this.Collider.draw();
            this.drawNormal();
        }
    }

    drawNormal() {
        let bx = this.Position.X + this.Size.X / 2;
        let by = this.Position.Y + this.Size.Y / 2;

        this._ctx.strokeStyle = '#FFFF00';
        this._ctx.beginPath();
        this._ctx.moveTo(bx, by);
        this._ctx.lineTo(bx + this.Normal.X * this.Size.X, by + this.Normal.Y * -this.Size.Y);
        this._ctx.stroke();
    }

    onCollision(collider) {

    }

    set Color(value) { this._color.change(value) }

    get Color() { return this._color }

}
