(function (global) {
    "use strict";

    let ctx = null;

    const Character = function() {
        this.xpos   = 0;
        this.ypos   = 0;
        this.width  = 0;
        this.height = 0;
        this.color  = 0xAA4411;
        this.vel    = 500;

        ctx = Core.GetInstance().ctx;
    };

    Character.prototype.configure = function(position, size) {
        this.xpos = position.x;
        this.ypos = position.y;
        this.width = size.width;
        this.height = size.height;
    };

    Character.prototype.update = function() {
        if (Core.IsKeyPressed(KeyCodes.E)) this.ypos += (this.vel * Core.frameTime / 1000);
        if (Core.IsKeyPressed(KeyCodes.Q)) this.ypos -= (this.vel * Core.frameTime / 1000);
    };

    Character.prototype.draw = function() {
        ctx.fillStyle = `rgb(${this.color & 0xFF},${(this.color & 0xFF00) >> 8},${(this.color & 0xFF0000) >> 16})`;
        ctx.fillRect(this.xpos, this.ypos, this.width, this.height);
    };

    global.Character = Character;

})(window);
