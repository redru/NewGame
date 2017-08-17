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
        this.move(this.Direction.X * this._velocity * Core.DeltaTime, -this.Direction.Y * this._velocity * Core.DeltaTime);

        const collisions = this.Collider.getCollisions();

        if (collisions.length !== 0) {
            this.Position.copy(oldPosition);

            collisions.forEach(object => {
                if ((object.Group === 'WALL' || object.Group === 'PLAYER') && object.Normal) {
                    this.Rotation = Vec2.Reflect(this.Direction, object.Normal).toRotation() + Math.random() * 16 - 8;

                    this.Rotation = Util2D.AdjustRotation(this.Rotation);

                    this.Direction = Vec2.GetNormalizedVector(this.Rotation);
                    this.Normal.copy(this.Direction);
                }
            });
        }

        this._animationRot += Core.DeltaTime * 200;
        if (this._animationRot >= 360) this._animationRot = 0;

        let reactionPos = this.Position.getVariant([this.CenterOffset.X, this.CenterOffset.Y]);

        for (let count = 0; count < 10; count++)
            Core.ParticlesEmitter.add(reactionPos, 200, Vec2.Invert(this.Direction).rotate(Math.random() * 60 - 30), Math.random() * 20, count % 2 === 0 && count % 3 === 0 ? 0x0000FF : 0x00FFFF );
    }

    draw() {
        /*this._ctx.fillStyle = `rgb(${this._color.Red},${this._color.Green},${this._color.Blue})`;
        this._ctx.beginPath();
        this._ctx.arc(this.Position.X + this._radius, this.Position.Y + this._radius, this._radius, 0, 2 * Math.PI);
        this._ctx.fill();*/
        this._ctx.save();
        this._ctx.translate(this.Center.X, this.Center.Y);
        this._ctx.rotate(Util2D.ToRadians(this._animationRot));
        this._ctx.drawImage(this._ballImage, -this.CenterOffset.X, -this.CenterOffset.Y, this.Size.X, this.Size.Y);
        this._ctx.restore();

        if (GameStatus.MustDrawInfo) {
            this.Collider.draw();
            this.drawInfo();
        }
    }

    set Color(value) { this._color.change(value) }

    get Color() { return this._color }

}
