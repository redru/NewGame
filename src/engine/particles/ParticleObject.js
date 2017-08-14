import Core     from "../Core"
import { Vec2 } from "../modules/Geometry2D"

export default class ParticleObject {

    constructor(type, position, duration, direction, velocity) {
        this._type              = type;
        this._startingPosition  = Vec2.Copy(position);
        this._startTime         = Core.Time;
        this._endTime           = Core.Time + duration;
        this._direction         = Vec2.Copy(direction);
        this._velocity          = velocity;
        this._ctx               = Core.Instance.Ctx;
    }

    draw() { }

    get CurrentPosition() {
        return new Vec2([
            this._startingPosition.X + (this._direction.X * this._velocity * (Core.Time - this._startTime) * Core.DeltaTime),
            this._startingPosition.Y + (this._direction.Y * this._velocity * (Core.Time - this._startTime) * Core.DeltaTime)
        ]);
    }

    set Type(value) { this._type = value }

    get Type() { return this._type }

    set StartingPosition(value) { this._startingPosition.copy(value) }

    get StartingPosition() { return this._startingPosition }

    set StartTime(value) { this._startTime = value }

    get StartTime() { return this._startTime }

    set EndTime(value) { this._endTime = value }

    get EndTime() { return this._endTime }

    set Direction(value) { this._direction.copy(value) }

    get Direction() { return this._direction }

    set Velocity(value) { this._velocity = value }

    get Velocity() { return this._velocity }

    get Ctx() { return this._ctx }


}