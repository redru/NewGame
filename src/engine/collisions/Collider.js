import { Vec2 }         from "../modules/Geometry2D"
import CollisionSystem  from "./CollisionSystem"

export default class Collider {

    constructor(attached) {
        this._position        = Vec2.Zero;
        this._size            = Vec2.Zero;
        this._attached        = attached;
        this._collidingWith   = [];
        this._collisionSystem = CollisionSystem.Instance;
    }

    attachObject(object) {
        this._attached = object;
        this._collisionSystem.register(this);
    }

    getCollisions() {
        return this._collisionSystem.executeCollisionCheck(this);
    }

    collidesWith(name) {
        for (let index in this._collidingWith) {
            if (this._collidingWith[index].Name === name)
                return true;
        }

        return false;
    }

    addCollidingObject(object) {
        let index = this._collidingWith.indexOf(object);

        if (index === -1)
            this._collidingWith.push(object);
    }

    removeCollidingObject(object) {
        let index = this._collidingWith.indexOf(object);

        if (index !== -1)
            this._collidingWith.splice(index, 1);
    }

    update() { }

    draw() { }

    set Position(value) { this._position.copy(value) }

    get Position() { return this._position }

    set Size(value) { this._size.copy(value) }

    get Size() { return this._size }

    set Attached(value) { this._attached = value }

    get Attached() { return this._attached }

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
