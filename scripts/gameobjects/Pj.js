"use strict";
import Core             from "../../src/engine/Core"
import CollisionSystem  from "../../src/engine/collisions/CollisionSystem"
import GameObject       from "../../src/engine/objects/GameObject";
import Color            from "../../src/engine/various/Color"
import KeyCodes         from "../../src/engine/various/KeyCodes"
import {Vec2, Util2D}   from "../../src/engine/modules/Geometry2D"
import GameStatus       from "../Game"

export default class Pj extends GameObject {

    constructor() {
        super();
        this._color             = new Color(0xAA4411);
        this._maxVelocity       = 500;
        this._currentVelocity   = 0;
        this._acceleration      = 80;
        this._rotationSpeed     = 200;
        this._lastKeyPress      = null; // Used to prevent acceleration save when switching direction

        this._canvasDim         = Core.Instance.CanvasDim;
        this._wallBottom        = Core.GameStorage.findGameObjectByName('WALL_BOTTOM');
        this._wallTop           = Core.GameStorage.findGameObjectByName('WALL_TOP');
    }

    onCollision(collider) { }

    update() {
        // Rotate if needed
        /*if (Core.IsKeyPressed(KeyCodes.A) && Core.IsKeyPressed(KeyCodes.D));
        else if (Core.IsKeyPressed(KeyCodes.A)) this.Rotation += (this._rotationSpeed * Core.DeltaTime);
        else if (Core.IsKeyPressed(KeyCodes.D)) this.Rotation -= (this._rotationSpeed * Core.DeltaTime);

        this.Rotation = Util2D.AdjustRotation(this.Rotation);*/

        // Recalculate normals
        this._normal.copy(Vec2.GetNormalizedVector(this.Rotation));

        // Set direction vector
        if (Core.IsKeyPressed(KeyCodes.E) && Core.IsKeyPressed(KeyCodes.Q)) {
            this.Direction.Y = 0;
            this._currentVelocity = 0;
            this._lastKeyPress = null;
        } else if (Core.IsKeyPressed(KeyCodes.E)) {
            this.Direction.Y = -1;

            if (this._lastKeyPress === KeyCodes.E)
                this._currentVelocity += this._acceleration;
            else
                this._lastKeyPress = KeyCodes.E;
        } else if (Core.IsKeyPressed(KeyCodes.Q)) {
            this.Direction.Y = 1;

            if (this._lastKeyPress === KeyCodes.Q)
                this._currentVelocity += this._acceleration;
            else
                this._lastKeyPress = KeyCodes.Q;
        } else {
            this._currentVelocity = 0;
            this.Direction.Y = 0;
            this._lastKeyPress = null;
        }

        if (this._currentVelocity > this._maxVelocity)
            this._currentVelocity = this._maxVelocity;

        // Move
        const oldPosition = Vec2.Copy(this.Position);

        this.Position.increment(0, -this.Direction.Y * this._currentVelocity * Core.DeltaTime);

        if (CollisionSystem.Square2collision(this.Collider, this._wallBottom.Collider) || CollisionSystem.Square2collision(this.Collider, this._wallTop.Collider))
            this.Position.copy(oldPosition);
    }

    draw() {
        this.Ctx.save();
        this.Ctx.translate(this.Position.X + this.Size.X / 2, this.Position.Y + this.Size.Y / 2);
        this.Ctx.rotate(-Util2D.ToRadians(this.Rotation)); // Negative rotation to rotate counterclockwise
        this.Ctx.fillStyle = this._color.toRgb();
        this.Ctx.fillRect(this.Size.X / -2, this.Size.Y / -2, this.Size.X, this.Size.Y);
        this.Ctx.restore();

        if (GameStatus.MustDrawInfo) {
            this.Collider.draw();
            this.drawInfo();
        }
    }

    set Color(value) { this._color.change(value) }

    get Color() { return this._color }

};
