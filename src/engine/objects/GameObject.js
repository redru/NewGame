"use strict";
import Core     from "../Core"
import {Vec2}   from "../modules/Geometry2D"

export default class GameObject {

    constructor() {
        this._id        = -1;
        this._name      = 'any';
        this._group     = 'default';
        this._position  = Vec2.Zero;
        this._size      = Vec2.Zero;
        this._normal    = Vec2.Zero;
        this._direction = Vec2.Zero;
        this._rotation  = 0;
        this._collider  = null;
        this._ctx       = Core.Instance.Ctx;
    }

    attachCollider(object) {
        object.attachObject(this);
        this._collider = object;
    }

    drawInfo() {
        let bx = this._position.X + this._size.X / 2;
        let by = this._position.Y + this._size.Y / 2;

        // Draw normal
        this._ctx.save();
        this._ctx.strokeStyle = '#FFFF00';
        this._ctx.beginPath();
        this._ctx.moveTo(bx, by);
        this._ctx.lineTo(bx + this._normal.X * 50, by - this._normal.Y * 50);
        this._ctx.stroke();
        this._ctx.restore();

        // Draw direction
        this._ctx.save();
        this._ctx.strokeStyle = '#00FF00';
        this._ctx.beginPath();
        this._ctx.moveTo(bx, by);
        this._ctx.lineTo(bx + this._direction.X * 75, by - this._direction.Y * 75);
        this._ctx.stroke();
        this._ctx.restore();
    }

    set Id(value) { this._id = value }

    get Id() { return this._id }

    set Name(value) { this._name = value }

    get Name() { return this._name }

    set Group(value) { this._group = value }

    get Group() { return this._group }

    set Position(value) { this._position.copy(value) }

    get Position() { return this._position }

    set Size(value) { this._size.copy(value) }

    get Size() { return this._size }

    set Normal(value) { this._normal.copy(value) }

    get Normal() { return this._normal }

    set Direction(value) { this._direction.copy(value) }

    get Direction() { return this._direction }

    set Rotation(value) { this._rotation = value }

    get Rotation() { return this._rotation }

    get Collider() { return this._collider }

    set Ctx(value) { this._ctx = value }

    get Ctx() { return this._ctx }

}
