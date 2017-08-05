"use strict";
import Core     from "../Core"
import Logger   from "../modules/Logger"
import Color    from "../various/Color"
import Collider from "./Collider"

export default class BoundingBox extends Collider {

    constructor(attached) {
        super(attached);
        this._color   = new Color(0xEE42F4);
        this._ctx     = Core.Instance.Ctx;
    }

    attachObject(object) {
        Collider.prototype.attachObject.call(this, object);
        Logger.Append(`[BoundingBox] Attached BoundingBox to ${object.Name}`);
    }

    draw() {
        this._ctx.strokeStyle = `rgb(${this._color.Red},${this._color.Green},${this._color.Blue})`;

        if (this.Attached)
            this._ctx.strokeRect(this.Attached.Position.X, this.Attached.Position.Y, this.Attached.Size.X, this.Attached.Size.Y);
        else
            this._ctx.strokeRect(this.Position.X, this.Position.Y, this.Size.X, this.Size.Y);
    }

    set Color(value) { this._color.change(value) }

    get Color() { return this._color }

    static get Type() { return Collider.Types.Square }

}
