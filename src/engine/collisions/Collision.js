"use strict";

export default class Collision {

    constructor(collider, side) {
        this._collider  = collider;
        this._side      = side;
        this._attached  = collider.Attached;
    }

    set Collider(value) { this._collider = value }

    get Collider() { return this._collider }

    set Side(value) { this._side = value }

    get Side() { return this._side }

    set Attached(value) { this._attached = value }

    get Attached() { return this._attached }

}

Collision.Sides = {
    TOP     : 0x00,
    RIGHT   : 0x01,
    BOTTOM  : 0x02,
    LEFT    : 0x03
};
