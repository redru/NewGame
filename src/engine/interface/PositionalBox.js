"use strict";
export default class PositionalBox {

    constructor() {
        this.__$position        = Vec2.Zero;
        this.__$size            = Vec2.One;
        this.__$styleColor      = new Color(0xFFFFFFFF);
        this.__$offset          = 0;
        this.__$paddingOffset   = 0;
        this.__$followedObject  = null;
        this.__$ctx             = Core.Instance.Ctx;
    }

    configure(position, size, padding, offset) {
        this.__$position.copy(position);
        this.__$size.copy(size);
        this.__$size.sumScalar(padding || 0);

        this.__$paddingOffset = (padding ? -padding / 2 : 0);
        this.__$offset = offset || 0;
    }

    follow(gameObject) {
        if (gameObject && gameObject.Position) this.__$followedObject = gameObject;
    }

    draw() {
        this.__$ctx.strokeStyle = `rgba(${this.__$styleColor.Red},${this.__$styleColor.Green},${this.__$styleColor.Blue},${this.__$styleColor.Alpha * Math.sin(Core.Time / 300)})`;
        if (this.__$followedObject) {
            let xpos = this.__$followedObject.Position.X + this.__$size.X;
            let ypos = this.__$followedObject.Position.Y > 20 ?
                this.__$followedObject.Position.Y + this.__$offset + this.__$paddingOffset :
                this.__$followedObject.Position.Y + this.__$offset + this.__$paddingOffset + 50;

            this.__$ctx.strokeRect(this.__$followedObject.Position.X + this.__$offset + this.__$paddingOffset, this.__$followedObject.Position.Y + this.__$offset + this.__$paddingOffset, this.__$size.X, this.__$size.Y);

            this.__$ctx.font = '12px serif';
            this.__$ctx.fillStyle = `rgb(${this.__$styleColor.Red},${this.__$styleColor.Green},${this.__$styleColor.Blue})`;
            this.__$ctx.fillText(`p : [${parseInt(this.__$followedObject.Position.X)}, ${parseInt(this.__$followedObject.Position.Y)}]`, xpos, ypos);
            this.__$ctx.fillText(`n : [${parseFloat(this.__$followedObject.normal.X)}, ${parseFloat(this.__$followedObject.normal.Y)}]`, xpos, ypos + 15);
            this.__$ctx.fillText(`° : ${this.__$followedObject.Rotation}`, xpos, ypos + 30);
        } else {
            this.__$ctx.strokeRect(this.__$position.X, this.__$position.Y, this.__$size.X, this.__$size.Y);
        }
    }

}
