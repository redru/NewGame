"use strict";
import Core             from "../../src/engine/Core"
import Color            from "../../src/engine/various/Color"
import KeyCodes         from "../../src/engine/various/KeyCodes"
import {Vec2, Util2D}   from "../../src/engine/modules/Geometry2D"
import GameStatus       from "../Game"

export default class Pj {

    constructor() {
        this._id              = -1;
        this._name            = '';
        this._group           = '';
        this._position        = Vec2.Zero;
        this._size            = Vec2.One;
        this._rotation        = 0;
        this._normal          = Vec2.StdNormal;
        this._color           = new Color(0xAA4411);
        this._direction       = new Vec2([0, 0]);
        this._velocity        = 500;
        this._rotationSpeed   = 200;
        this._collider        = null;

        this._ctx             = Core.Instance.Ctx;
        this._canvasDim       = Core.Instance.CanvasDim;
    }

    attachCollider(collider) {
        this._collider = collider;
        collider.attachObject(this);
    }

    onCollision(collider) { }

    update() {
        // Rotate if needed
        if (Core.IsKeyPressed(KeyCodes.A) && Core.IsKeyPressed(KeyCodes.D));
        else if (Core.IsKeyPressed(KeyCodes.A)) this._rotation += (this._rotationSpeed * Core.DeltaTime);
        else if (Core.IsKeyPressed(KeyCodes.D)) this._rotation -= (this._rotationSpeed * Core.DeltaTime);

        this._rotation = Util2D.AdjustRotation(this._rotation);

        // Recalculate normals
        this._normal.copy(Vec2.GetNormal(this._rotation));

        // Set direction vector
        if (Core.IsKeyPressed(KeyCodes.E) && Core.IsKeyPressed(KeyCodes.Q)) this._direction.Y = 0;
        else if (Core.IsKeyPressed(KeyCodes.E) && !this._collider.collidesWith('WALL_BOTTOM')) this._direction.Y = 1;
        else if (Core.IsKeyPressed(KeyCodes.Q) && !this._collider.collidesWith('WALL_TOP')) this._direction.Y = -1;
        else this._direction.Y = 0;

        // Move
        this._position.increment(0, this._direction.Y * this._velocity * Core.DeltaTime);
    }

    draw() {
        this._ctx.save();
        this._ctx.translate(this._position.X + this._size.X / 2, this._position.Y + this._size.Y / 2);
        this._ctx.rotate(-Util2D.ToRadians(this._rotation)); // Negative rotation to rotate counterclockwise
        this._ctx.fillStyle = `rgb(${this._color.Red},${this._color.Green},${this._color.Blue})`;
        this._ctx.fillRect(this._size.X / -2, this._size.Y / -2, this._size.X, this._size.Y);
        this._ctx.restore();

        if (GameStatus.MustDrawInfo) {
            this._collider.draw();
            this.drawNormal();
            this.drawDirection();
        }
    }

    drawNormal() {
        let bx = this._position.X + this._size.X / 2;
        let by = this._position.Y + this._size.Y / 2;

        this._ctx.strokeStyle = '#FFFF00';
        this._ctx.beginPath();
        this._ctx.moveTo(bx, by);
        this._ctx.lineTo(bx + this._normal.X * 50, by + this._normal.Y * -50);
        this._ctx.stroke();
    }

    drawDirection() {
        let bx = this._position.X + this._size.X / 2;
        let by = this._position.Y + this._size.Y / 2;

        this._ctx.strokeStyle = '#00FF00';
        this._ctx.beginPath();
        this._ctx.moveTo(bx, by);
        this._ctx.lineTo(bx + this._direction.X * this._velocity * 0.25, by + this._direction.Y * this._velocity * 0.25);
        this._ctx.stroke();
    }

    set Id(value) { this._id = value }

    get Id() { return this._id }

    set Name(value) { this._name = value }

    get Name() { return this._name }

    set Group(value) { this._group = value }

    get Group() { return this._group }

    set Color(value) {
        if (!value) {
            this._color.change(0x000000);
            return;
        }

        this._color.change(typeof value === 'string' ? parseInt(value) : value);
    }

    get Color() { return this._color }

    set Position(value) { this._position.copy(value) }

    get Position() { return this._position }

    set Size(value) { this._size.copy(value) }

    get Size() { return this._size }

    set Rotation(value) { this._rotation = value }

    get Rotation() { return this._rotation }

    set Normal(value) { this._normal.copy(value) }

    get Normal() { return this._normal }

    set Collider(value) { this._collider = value }

    get Collider() { return this._collider }

};
