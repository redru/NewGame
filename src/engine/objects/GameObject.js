"use strict";
import {Vec2} from "../modules/Geometry2D";

export default class GameObject {

    constructor() {
        this.__$id          = -1;
        this.__$name        = '';
        this.__$position    = Vec2.Zero;
        this.__$size        = Vec2.Zero;
        this.__$normal      = Vec2.Zero;
        this.__$rotation    = 0;
        this.__$collider    = null;
    }

    attachCollider(object) {
        object.attachObject(this);
        this.__$collider = object;
    }

    set Id(value) { this.__$id = value }

    get Id() { return this.__$id }

    set Name(value) { this.__$name = value }

    get Name() { return this.__$name }

    set Position(value) { this.__$position.copy(value) }

    get Position() { return this.__$position }

    set Size(value) { this.__$size.copy(value) }

    get Size() { return this.__$size }

    set Normal(value) { this.__$normal.copy(value) }

    get Normal() { return this.__$normal }

    set Rotation(value) { this.__$rotation.copy(value) }

    get Rotation() { return this.__$rotation }

    get Collider() { return this.__$collider }

}
