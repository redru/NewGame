import { Vec2 } from "../modules/Geometry2D"

export default class Collider {

    constructor(attached) {
        this.__$position    = Vec2.Zero;
        this.__$size        = Vec2.Zero;
        this.__$attached    = attached;
    }

    attachObject(object) {
        this.__$attached = object;
    }

    update() { }

    draw() { }

    set Position(value) { this.__$position.copy(value) }

    get Position() { return this.__$position }

    set Size(value) { this.__$size.copy(value) }

    get Size() { return this.__$size }

    set Attached(value) { this.__$attached = value }

    get Attached() { return this.__$attached }

}
