"use strict";
import Core         from "../Core"
import GameStorage  from "../modules/GameStorage"
import {Vec2}       from "../modules/Geometry2D"

export default class GameObject {

    constructor() {
        this._id            = -1;
        this._name          = 'any';
        this._group         = 'default';
        this._position      = Vec2.Zero;
        this._size          = Vec2.Zero;
        this._normal        = Vec2.Zero;
        this._direction     = Vec2.Zero;
        this._center        = Vec2.Zero;
        this._centerOffset  = Vec2.Zero;
        this._rotation      = 0;
        this._collider      = null;
        this._ctx           = Core.Instance.Ctx;
        this._gameStorage   = GameStorage;
        this._top           = 0;
        this._right         = 0;
        this._bottom        = 0;
        this._left          = 0;
    }

    attachCollider(object) {
        object.attachObject(this);
        this._collider = object;
    }

    move(xOffset, yOffset) {
        this._position.increment(xOffset, yOffset);
        this._center.copy(Vec2.SumVectors(this._position, this._centerOffset));
        this._top = this._position.Y;
        this._right = this._position.X + this._size.Width;
        this._bottom = this._position.Y + this._size.Height;
        this._left = this._position.X;
    }

    drawInfo() {
        // Draw normal
        this._ctx.save();
        this._ctx.strokeStyle = '#FFFF00';
        this._ctx.beginPath();
        this._ctx.moveTo(this._center.X, this._center.Y);
        this._ctx.lineTo(this._center.X + this._normal.X * 50, this._center.Y - this._normal.Y * 50);
        this._ctx.stroke();
        this._ctx.restore();

        // Draw direction
        this._ctx.save();
        this._ctx.strokeStyle = '#00FF00';
        this._ctx.beginPath();
        this._ctx.moveTo(this._center.X, this._center.Y);
        this._ctx.lineTo(this._center.X + this._direction.X * 75, this._center.Y - this._direction.Y * 75);
        this._ctx.stroke();
        this._ctx.restore();
    }

    set Id(value) { this._id = value }

    get Id() { return this._id }

    set Name(value) { this._name = value }

    get Name() { return this._name }

    set Group(value) { this._group = value }

    get Group() { return this._group }

    set Position(value) {
        this._position.copy(value);
        this._center.copy(Vec2.SumVectors(this._position, this._centerOffset));
        this._top = this._position.Y;
        this._right = this._position.X + this._size.Width;
        this._bottom = this._position.Y + this._size.Height;
        this._left = this._position.X;
    }

    get Position() { return this._position }

    set Size(value) {
        this._size.copy(value);
        this._centerOffset = new Vec2([value.X / 2, value.Y / 2]);
        this._center.copy(Vec2.SumVectors(this._position, this._centerOffset));
        this._top = this._position.Y;
        this._right = this._position.X + this._size.Width;
        this._bottom = this._position.Y + this._size.Height;
        this._left = this._position.X;
    }

    get Size() { return this._size }

    set Normal(value) { this._normal.copy(value) }

    get Normal() { return this._normal }

    set Direction(value) { this._direction.copy(value) }

    get Direction() { return this._direction }

    get Center() { return this._center }

    get CenterOffset() { return this._centerOffset }

    set Rotation(value) { this._rotation = value }

    get Rotation() { return this._rotation }

    get Collider() { return this._collider }

    set Ctx(value) { this._ctx = value }

    get Ctx() { return this._ctx }

    get GameStorage() { return this._gameStorage }

    get Top() { return this._top }

    get Right() { return this._right }

    get Bottom() { return this._bottom }

    get Left() { return this._left }

}
