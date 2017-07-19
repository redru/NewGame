(function (global) {
    "use strict";

    const Core = global.Core;

    const Character = function() {
        this.xpos   = 0;
        this.ypos   = 0;
        this.width  = 0;
        this.height = 0;
        this.color  = 0xAA4411;
    };

    Character.prototype.configure = function(position, size) {
        this.xpos = position.x;
        this.ypos = position.y;
        this.width = size.width;
        this.height = size.height;
    };

    Character.prototype.update = function(time) {
        if (Core.isKeyPressed(83)) this.ypos += 15;
        if (Core.isKeyPressed(87)) this.ypos -= 15;
    };

    Character.prototype.draw = function(ctx) {
        ctx.fillStyle = `rgb(${this.color & 0xFF},${(this.color & 0xFF00) >> 8},${(this.color & 0xFF0000) >> 16})`;
        ctx.fillRect(this.xpos, this.ypos, this.width, this.height);
    };

    global.Character = Character;

})(window);
