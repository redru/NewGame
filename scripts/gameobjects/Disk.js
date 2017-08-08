"use strict";
import Core             from "../../src/engine/Core"
import GameObject       from "../../src/engine/objects/GameObject";
import Color            from "../../src/engine/various/Color"
import {Vec2, Util2D}   from "../../src/engine/modules/Geometry2D"
import GameStatus       from "../Game"

export default class Disk extends GameObject {

    constructor() {
        super();
        this.Rotation       = Math.random() * 360;
        this.Normal         = Vec2.GetNormalizedVector(this.Rotation);
        this.Direction      = Vec2.Copy(this.Normal);
        this._radius        = 0;
        this._color         = new Color(0x0055FF);
        this._velocity      = 500;

        this._ballImage     = document.getElementById('ball');
        this._animationRot  = 0;
    }

    onCollision(object) { }

    update() {
        const oldPosition = Vec2.Copy(this.Position);
        this.Position.increment(this.Direction.X * this._velocity * Core.DeltaTime, -this.Direction.Y * this._velocity * Core.DeltaTime);

        const collisions = this.Collider.getCollisions();

        if (collisions.length !== 0) {
            this.Position.copy(oldPosition);

            collisions.forEach(object => {
                if ((object.Group === 'WALL' || object.Group === 'PLAYER') && object.Normal) {
                    this.Rotation = Vec2.Reflect(this.Direction, object.Normal).toRotation() + Math.random() * 20 - 10;

                    this.Rotation = Util2D.AdjustRotation(this.Rotation);

                    this.Direction = Vec2.GetNormalizedVector(this.Rotation);
                    this.Normal.copy(this.Direction);
                }
            });
        }

        this._animationRot += Core.DeltaTime * 200;
        if (this._animationRot >= 360) this._animationRot = 0;
    }

    draw() {
        /*this._ctx.fillStyle = `rgb(${this._color.Red},${this._color.Green},${this._color.Blue})`;
        this._ctx.beginPath();
        this._ctx.arc(this.Position.X + this._radius, this.Position.Y + this._radius, this._radius, 0, 2 * Math.PI);
        this._ctx.fill();*/
        this._ctx.save();
        this._ctx.translate(this.Position.X + this.Size.X / 2, this.Position.Y + this.Size.Y / 2);
        this._ctx.rotate(Util2D.ToRadians(this._animationRot));
        this._ctx.drawImage(this._ballImage, this.Size.X / -2, this.Size.Y / -2, this.Size.X, this.Size.Y);
        this._ctx.restore();

        if (GameStatus.MustDrawInfo) {
            this.Collider.draw();
            this.drawInfo();
        }
    }

    set Color(value) { this._color.change(value) }

    get Color() { return this._color }

}
