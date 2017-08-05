"use strict";
import {Vec2} from "../modules/Geometry2D";

export default class GameObject {

    constructor() {
        this._id        = -1;
        this._name      = 'any';
        this._group     = 'default';
        this._position  = Vec2.Zero;
        this._size      = Vec2.Zero;
        this._normal    = Vec2.Zero;
        this._rotation  = 0;
        this._collider  = null;
    }

    attachCollider(object) {
        object.attachObject(this);
        this._collider = object;
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

    set Rotation(value) { this._rotation.copy(value) }

    get Rotation() { return this._rotation }

    get Collider() { return this._collider }

}
