import Core     from "../Core"
import { Vec2 } from "../modules/Geometry2D"
import Color    from "../various/Color"

export default class ParticleObject {

    constructor(type, position, duration, direction, velocity, color) {
        this._type              = type;
        this._startingPosition  = position ? Vec2.Copy(position) : Vec2.Zero;
        this._startTime         = Core.Time;
        this._endTime           = Core.Time + duration;
        this._direction         = direction ? Vec2.Copy(direction) : Vec2.Zero;
        this._velocity          = velocity;
        this._color             = new Color(color);
        this._enabled           = false;
        this._ctx               = Core.Instance.Ctx;
    }

    draw() { }

    get CurrentPosition() {
        return new Vec2([
            this._startingPosition.X + this._direction.X * this._velocity * (Core.Time - this._startTime) * 0.016,
            this._startingPosition.Y + -(this._direction.Y * this._velocity * (Core.Time - this._startTime) * 0.016)
        ]);
    }

    set Type(value) { this._type = value }

    get Type() { return this._type }

    set StartingPosition(value) { this._startingPosition.copy(value) }

    get StartingPosition() { return this._startingPosition }

    set StartTime(value) { this._startTime = value }

    get StartTime() { return this._startTime }

    get EndTime() { return this._endTime }

    set Duration(value) { this._startTime = Core.Time; this._endTime = this._startTime + value; }

    set Direction(value) { this._direction.copy(value) }

    get Direction() { return this._direction }

    set Velocity(value) { this._velocity = value }

    get Velocity() { return this._velocity }

    set Color(value) { this._color.change(value) }

    get Color() { return this._color }

    set Enabled(value) { this._enabled = value }

    get Enabled() { return this._enabled }

    get Ctx() { return this._ctx }


}