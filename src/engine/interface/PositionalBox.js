"use strict";
export default function PositionalBox() {
    this.position       = Vec2.Zero();
    this.size           = Vec2.One();
    this.offset         = 0;
    this.paddingOffset  = 0;
    this.followedObject = null;

    this.ctx            = Core.GetInstance().ctx;
    this.canvasDim      = Core.GetInstance().canvasDim;
};

PositionalBox.prototype.configure = function(position, size, padding, offset) {
    this.position.copy(position);
    this.size.copy(size);
    this.size.sumScalar(padding || 0);

    this.paddingOffset = (padding ? -padding / 2 : 0);
    this.offset = offset || 0;
};

PositionalBox.prototype.follow = function(gameObject) {
    if (gameObject && gameObject.hasOwnProperty('position')) this.followedObject = gameObject;
};

PositionalBox.prototype.draw = function() {
    this.ctx.strokeStyle = '#FFFFFF';
    if (this.followedObject) {
        let xpos = this.followedObject.position.x() + this.size.x();
        let ypos = this.followedObject.position.y() > 20 ?
            this.followedObject.position.y() + this.offset + this.paddingOffset :
            this.followedObject.position.y() + this.offset + this.paddingOffset + 50;

        this.ctx.strokeRect(this.followedObject.position.x() + this.offset + this.paddingOffset, this.followedObject.position.y() + this.offset + this.paddingOffset, this.size.x(), this.size.y());

        this.ctx.font = '12px serif';
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillText(`x: ${parseInt(this.followedObject.position.x())}`, xpos, ypos);
        this.ctx.fillText(`y: ${parseInt(this.followedObject.position.y())}`, xpos, ypos + 15);
    } else {
        this.ctx.strokeRect(this.position.x(), this.position.y(), this.size.x(), this.size.y());
    }
};

window.PositionalBox = PositionalBox;
