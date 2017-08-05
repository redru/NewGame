"use strict";
import Core             from "../../src/engine/Core"
import Color            from "../../src/engine/various/Color"
import {Vec2, Util2D}   from "../../src/engine/modules/Geometry2D"
import GameStatus       from "../Game"

export default class Disk {

    constructor() {
        this._id              = -1;
        this._name            = '';
        this._position        = Vec2.Zero;
        this._size            = Vec2.One;
        this._radius          = 0;
        this._rotation        = Math.random() * 360;
        this._normal          = Vec2.GetNormal(this._rotation);
        this._color           = new Color(0x0055FF);
        this._direction       = Vec2.Copy(this._normal);
        this._velocity        = 250;
        this._rotationSpeed   = 100;
        this._collider        = null;

        this._ballImage       = document.getElementById('ball');
        this._animationRot    = 0;

        this._ctx             = Core.Instance.Ctx;
    }

    attachCollider(collider) {
        this._collider = collider;
        collider.attachObject(this);
    }

    onCollision(object) {

    }

    update() {
        const oldPosition = Vec2.Copy(this._position);
        this._position.increment(this._direction.X * this._velocity * Core.DeltaTime, this._direction.Y * this._velocity * Core.DeltaTime);

        const collisions = this._collider.getCollisions();

        if (collisions.length !== 0) {
            this._position.copy(oldPosition);

            collisions.forEach(object => {
                if ((object.Group === 'WALL' || object.Group === 'PLAYER') && object.Normal) {
                    this._rotation = Vec2.Reflect(this._direction, object.Normal).toRotation() + Math.random() * 20 - 10;

                    this._rotation = Util2D.AdjustRotation(this._rotation);

                    this._direction = Vec2.GetNormal(this._rotation);
                    this._normal.copy(this._direction);
                }
            });
        }

        this._animationRot += Core.DeltaTime * 200;
        if (this._animationRot >= 360) this._animationRot = 0;
    }

    draw() {
        /*this._ctx.fillStyle = `rgb(${this._color.Red},${this._color.Green},${this._color.Blue})`;
        this._ctx.beginPath();
        this._ctx.arc(this._position.X + this._radius, this._position.Y + this._radius, this._radius, 0, 2 * Math.PI);
        this._ctx.fill();*/
        this._ctx.save();
        this._ctx.translate(this._position.X + this._size.X / 2, this._position.Y + this._size.Y / 2);
        this._ctx.rotate(Util2D.ToRadians(this._animationRot));
        this._ctx.drawImage(this._ballImage, this._size.X / -2, this._size.Y / -2, this._size.X, this._size.Y);
        this._ctx.restore();

        if (GameStatus.MustDrawInfo) {
            this._collider.draw();
            this.drawNormal();
        }
    }

    drawNormal() {
        let bx = this._position.X + this._size.X / 2;
        let by = this._position.Y + this._size.Y / 2;

        this._ctx.strokeStyle = '#FFFF00';
        this._ctx.beginPath();
        this._ctx.moveTo(bx, by);
        this._ctx.lineTo(bx + this._normal.X * 50, by + this._normal.Y * 50);
        this._ctx.stroke();
    }

    set Id(value) { this._id = value }

    get Id() { return this._id }

    set Name(value) { this._name = value }

    get Name() { return this._name }

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

    set Size(value) {
        this._size.copy(value);
        this._radius = value.Width / 2;
    }

    get Size() { return this._size }

    get Radius() { return this._radius }

    set Rotation(value) { this._rotation = value }

    get Rotation() { return this._rotation }

    set Normal(value) { this._normal.copy(value) }

    get Normal() { return this._normal }

    set Collider(value) { this._collider = value }

    get Collider() { return this._collider }

}
