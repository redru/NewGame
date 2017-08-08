"use strict";
import Core             from "../../src/engine/Core"
import GameObject       from "../../src/engine/objects/GameObject";
import Color            from "../../src/engine/various/Color"
import {Vec2, Util2D}   from "../../src/engine/modules/Geometry2D"
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
        this.Position.Y = (this._ball.Position.Y + this._ball.Size.Height / 2) - (this.Size.Y / 2);

        this.Normal.copy(Vec2.GetNormalizedVector(this.Rotation));
    }

    draw() {
        this.Ctx.fillStyle = `rgb(${this._color.Red},${this._color.Green},${this._color.Blue})`;
        this.Ctx.fillRect(this.Position.X, this.Position.Y, this.Size.X, this.Size.Y);

        if (GameStatus.MustDrawInfo) {
            this.Collider.draw();
            this.drawInfo();
        }
    }

    set Color(value) { this._color.change(value) }

    get Color() { return this._color }

}
