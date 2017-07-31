"use strict";
import Core     from "../Core"
import Logger   from "../modules/Logger"
import Color    from "../various/Color"
import Collider from "./Collider"

export default class BoundingBox extends Collider {

    constructor(attached) {
        super(attached);
        this.__$color   = new Color(0xEE42F4);
        this.__$ctx     = Core.Instance.Ctx;
    }

    attachObject(object) {
        Collider.prototype.attachObject.call(this, object);
        Logger.Append(`[BoundingBox] Attached BoundingBox to ${object.Name}`);
    }

    draw() {
        this.__$ctx.strokeStyle = `rgb(${this.__$color.Red},${this.__$color.Green},${this.__$color.Blue})`;

        if (this.Attached)
            this.__$ctx.strokeRect(this.Attached.Position.X, this.Attached.Position.Y, this.Attached.Size.X, this.Attached.Size.Y);
        else
            this.__$ctx.strokeRect(this.Position.X, this.Position.Y, this.Size.X, this.Size.Y);
    }

    set Color(value) { this.__$color.change(value) }

    get Color() { return this.__$color }

    static get Type() { return Collider.Types.Square }

}
