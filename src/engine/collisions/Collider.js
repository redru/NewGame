import { Vec2 }         from "../modules/Geometry2D"
import CollisionSystem  from "./CollisionSystem"

export default class Collider {

    constructor(attached) {
        this.__$position        = Vec2.Zero;
        this.__$size            = Vec2.Zero;
        this.__$attached        = attached;
        this.__$collidingWith   = [];
    }

    attachObject(object) {
        this.__$attached = object;
        CollisionSystem.Instance.register(this);
    }

    collidesWith(name) {
        for (let index in this.__$collidingWith) {
            if (this.__$collidingWith[index].Name === name)
                return true;
        }

        return false;
    }

    addCollidingObject(object) {
        let index = this.__$collidingWith.indexOf(object);

        if (index === -1)
            this.__$collidingWith.push(object);
    }

    removeCollidingObject(object) {
        let index = this.__$collidingWith.indexOf(object);

        if (index !== -1)
            this.__$collidingWith.splice(index, 1);
    }

    update() { }

    draw() { }

    set Position(value) { this.__$position.copy(value) }

    get Position() { return this.__$position }

    set Size(value) { this.__$size.copy(value) }

    get Size() { return this.__$size }

    set Attached(value) { this.__$attached = value }

    get Attached() { return this.__$attached }

    static GenerateTypesMask(type_1, type_2) { return ((type_1 << 1) | type_2) }

    static get Types() {
        return {
            Square: 0x00,
            Circle: 0x01
        }
    }

    static get Masks() {
        return {
            Square2     : 0x00,
            SquareCircle: 0x01,
            CircleSquare: 0x10,
            Circle2     : 0x11
        }
    }

}
