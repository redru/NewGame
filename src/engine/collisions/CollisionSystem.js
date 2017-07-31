"use strict";
import Core     from "../Core"
import { Vec2 } from "../modules/Geometry2D"

export default class CollisionSystem {

    constructor() {
        this.__$registeredColliders = [];
    }

    register(collider) {
        this.__$registeredColliders.push(collider);
    }

    checkCollision() {

    }

    get RegisteredColliders() { return this.__$registeredColliders }

}
