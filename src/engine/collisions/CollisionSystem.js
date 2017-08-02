"use strict";
import Logger   from "../modules/Logger";
import Collider from "./Collider";

export default class CollisionSystem {

    constructor() {
        this.__$registeredColliders = [];
        this.__$collisionMap        = { };
    }

    register(collider) {
        this.__$registeredColliders.push(collider);
        Logger.Append(`[CollisionSystem] Current active colliders: ${this.__$registeredColliders.length}`);
    }

    checkCollision() {
        this.__$collisionMap = { };

        this.__$registeredColliders.forEach((collider_1, index_1) => {
            this.__$registeredColliders.forEach((collider_2, index_2) => {
                let key = CollisionSystem.GenerateKey(index_1, index_2);

                // Don't check collision on the same object
                // Return if combination has already been checked
                // Check collision
                if (index_1 === index_2) {
                    this.__$collisionMap[key] = true;
                    return;
                } else if (this.__$collisionMap[key]) {
                    return;
                }

                this.__$collisionMap[key] = true;

                if (Collider.GenerateTypesMask(collider_1.Type, collider_2.Type) === Collider.Masks.Square2) {
                    if (CollisionSystem.Square2collision(collider_1, collider_2)) {
                        // Logger.Append(`[CollisionSystem] Collision between ${collider_1.Attached.Name} and ${collider_2.Attached.Name}`);
                        collider_1.addCollidingObject(collider_2.Attached);
                        collider_2.addCollidingObject(collider_1.Attached);

                        collider_1.Attached.onCollision(collider_2.Attached);
                        collider_2.Attached.onCollision(collider_1.Attached);
                    } else {
                        collider_1.removeCollidingObject(collider_2.Attached);
                        collider_2.removeCollidingObject(collider_1.Attached);
                    }
                }
            });
        });
    }

    executeCollisionCheck(collider) {
        const collisions = [];

        this.__$registeredColliders.forEach(target => {
            if (collider !== target) {
                switch(Collider.GenerateTypesMask(target.Type, collider.Type)) {
                    case Collider.Masks.Square2:
                        if (CollisionSystem.Square2collision(target, collider)) {
                            // Logger.Append(`[CollisionSystem] Collision between ${target.Attached.Name} and ${collider.Attached.Name}`);
                            collisions.push(target.Attached);
                        }
                        break;
                }
            }
        });

        return collisions;
    }

    static GenerateKey(key_1, key_2) {
        return key_1 < key_2 ? `${key_1}${key_2}` : `${key_2}${key_1}`;
    }

    static Square2collision(collider_1, collider_2) {
        return (collider_1.Attached.Position.X < collider_2.Attached.Position.X + collider_2.Attached.Size.Width &&
            collider_1.Attached.Position.X + collider_1.Attached.Size.Width > collider_2.Attached.Position.X &&
            collider_1.Attached.Position.Y < collider_2.Attached.Position.Y + collider_2.Attached.Size.Height &&
            collider_1.Attached.Size.Height + collider_1.Attached.Position.Y > collider_2.Attached.Position.Y);
    }

    static get Instance() { return CollisionSystem.__$instance }

}

CollisionSystem.__$instance = new CollisionSystem();
