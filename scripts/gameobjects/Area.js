"use strict";
import Core                 from "../../src/engine/Core"
import RectangleGameObject  from "../../src/engine/objects/RectangleGameObject"

export default class Area extends RectangleGameObject {

    constructor() {
        super();
    }

    draw() {
        this.Ctx.fillStyle = `rgba(${this.Color.Red},${this.Color.Green},${this.Color.Blue},${this.Color.Alpha * 0.3})`;
        this.Ctx.fillRect(this.Position.X, this.Position.Y, this.Size.X, this.Size.Y);

        if (Core.Instance.StatsActive) {
            this.Collider.draw();
            this.drawNormal();
        }
    }

}
