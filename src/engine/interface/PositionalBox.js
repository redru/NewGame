"use strict";
import Core     from "../Core"
import Color    from "../various/Color"
import {Vec2}   from "../modules/Geometry2D";

export default class PositionalBox {

    constructor() {
        this._position        = Vec2.Zero;
        this._size            = Vec2.One;
        this._styleColor      = new Color(0xFFFFFFFF);
        this._offset          = 0;
        this._paddingOffset   = 0;
        this._followedObject  = null;
        this._ctx             = Core.Instance.Ctx;
    }

    configure(position, size, padding, offset) {
        this._position.copy(position);
        this._size.copy(size);
        this._size.sumScalar(padding || 0);

        this._paddingOffset = (padding ? -padding / 2 : 0);
        this._offset = offset || 0;
    }

    follow(gameObject) {
        if (gameObject && gameObject.Position) this._followedObject = gameObject;
    }

    draw() {
        this._ctx.strokeStyle = `rgba(${this._styleColor.Red},${this._styleColor.Green},${this._styleColor.Blue},${this._styleColor.Alpha * Math.sin(Core.Time / 300)})`;
        if (this._followedObject) {
            let xpos = this._followedObject.Position.X + this._size.X;
            let ypos = this._followedObject.Position.Y > 20 ?
                this._followedObject.Position.Y + this._offset + this._paddingOffset :
                this._followedObject.Position.Y + this._offset + this._paddingOffset + 50;

            this._ctx.strokeRect(this._followedObject.Position.X + this._offset + this._paddingOffset, this._followedObject.Position.Y + this._offset + this._paddingOffset, this._size.X, this._size.Y);

            this._ctx.font = '12px serif';
            this._ctx.fillStyle = `rgb(${this._styleColor.Red},${this._styleColor.Green},${this._styleColor.Blue})`;
            this._ctx.fillText(`id : ${this._followedObject.Id}`, xpos, ypos);
            this._ctx.fillText(`name : ${this._followedObject.Name}`, xpos, ypos + 15);
            this._ctx.fillText(`p : [${parseInt(this._followedObject.Position.X)}, ${parseInt(this._followedObject.Position.Y)}]`, xpos, ypos + 30);
            this._ctx.fillText(`n : [${parseFloat(this._followedObject.Normal.X)}, ${parseFloat(this._followedObject.Normal.Y)}]`, xpos, ypos + 45);
            this._ctx.fillText(`° : ${this._followedObject.Rotation}`, xpos, ypos + 60);
        } else {
            this._ctx.strokeRect(this._position.X, this._position.Y, this._size.X, this._size.Y);
        }
    }

}
