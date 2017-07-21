(function (global) {
    "use strict";

    let ctx = null;
    let canvasDim = null;

    const PositionalBox     = function() {
        this.position       = Vec2.Zero();
        this.size           = Vec2.One();
        this.offset         = 0;
        this.paddingOffset  = 0;
        this.followedObject = null;

        ctx = Core.GetInstance().ctx;
        canvasDim = Core.GetInstance().canvasDim;
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
        ctx.strokeStyle = '#FFFFFF';
        if (this.followedObject) {
            ctx.strokeRect(this.followedObject.position.x() + this.offset + this.paddingOffset, this.followedObject.position.y() + this.offset + this.paddingOffset, this.size.x(), this.size.y());

            ctx.font = '12px serif';
            ctx.fillStyle = '#FFFFFF';
            ctx.fillText(`x: ${parseInt(this.followedObject.position.x())}`, this.followedObject.position.x() + this.size.x(), this.followedObject.position.y() + this.offset + this.paddingOffset);
            ctx.fillText(`y: ${parseInt(this.followedObject.position.y())}`, this.followedObject.position.x() + this.size.x(), this.followedObject.position.y() + this.offset + this.paddingOffset + 15);
        } else {
            ctx.strokeRect(this.position.x(), this.position.y(), this.size.x(), this.size.y());
        }
    };

    global.PositionalBox = PositionalBox;

})(window);
