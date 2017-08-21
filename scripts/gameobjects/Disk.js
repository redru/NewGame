"use strict";
import Core             from "../../src/engine/Core"
import GameObject       from "../../src/engine/objects/GameObject";
import Color            from "../../src/engine/various/Color"
import {Vec2, Util2D}   from "../../src/engine/modules/Geometry2D"
import GameStatus       from "../Game"
import CircularWave from "../../src/engine/animations/CircularWave";

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
        this._scored        = false;
    }

    onCollision(object) { }

    update() {
        // Save old position
        const oldPosition = Vec2.Copy(this.Position);

        // Move
        this.move(this.Direction.X * this._velocity * Core.DeltaTime, -this.Direction.Y * this._velocity * Core.DeltaTime);

        // Get collisions
        const collisions = this.Collider.getCollisions();

        // Handle collisions of the ball
        if (collisions.length !== 0) {

            // Return to old position
            this.Position.copy(oldPosition);

            // Check collisions and act based on collision type
            collisions.forEach(object => {

                // If colliding with a WALL or PLAYER, reflect based on object normals
                if ((object.Group === 'WALL' || object.Group === 'PLAYER') && object.Normal) {
                    this.Rotation = Vec2.Reflect(this.Direction, object.Normal).toRotation() + Math.random() * 16 - 8;

                    this.Rotation = Util2D.AdjustRotation(this.Rotation);

                    this.Direction = Vec2.GetNormalizedVector(this.Rotation);
                    this.Normal.copy(this.Direction);
                } else if (object.Group === 'AREA' && !this._scored) {
                    new CircularWave(this.Center, 3, 0, 200, 0, 360);
                    this._scored = true;
                }
            });
        } else {
            // If no collisions, emit reactor particles
            let reactionDir = Vec2.Invert(this.Direction);
            let reactionPos = Vec2.MultiplyScalar(reactionDir, this.Size.Width);
            reactionPos.Y = -reactionPos.Y;
            reactionPos.increment(this.Center.X, this.Center.Y);

            for (let count = 0; count < 10; count++)
                Core.ParticlesEmitter.add(reactionPos, 50, reactionDir.rotation(Math.random() * 60 - 30), Math.random() * 800, count === 1 ? 0x0000FF : 0x00FFFF );
        }

        this._animationRot += Core.DeltaTime * 200;
        if (this._animationRot >= 360) this._animationRot = 0;
    }

    draw() {
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
