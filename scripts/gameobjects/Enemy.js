"use strict";
import GameObject       from "../../src/engine/objects/GameObject"
import Color            from "../../src/engine/various/Color"
import { Vec2 }         from "../../src/engine/modules/Geometry2D"
import GameStatus       from "../Game"

export default class Enemy extends GameObject {

    constructor() {
        super();
        this._color     = new Color(0x55AA00);
        this._velocity  = 500;
        this._ball      = this.GameStorage.findGameObjectByName('DISK_1');
    }

    onCollision(collider) {

    }

    update() {
        this.move(0, this._ball.Position.Y - this.Position.Y);
        this.Normal.copy(Vec2.GetNormalizedVector(this.Rotation));
    }

    draw() {
        this.Ctx.fillStyle = this._color.toRgb();
        this.Ctx.fillRect(this.Position.X, this.Position.Y, this.Size.Width, this.Size.Height);

        if (GameStatus.MustDrawInfo) {
            this.Collider.draw();
            this.drawInfo();
        }
    }

    set Color(value) { this._color.change(value) }

    get Color() { return this._color }

}
