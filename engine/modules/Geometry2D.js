(function (global) {
    "use strict";

    const Vec2 = function(vec2) {
        this._$val = vec2 ? vec2 : Vec2.One();
    };

    Vec2.prototype.x = function(newVal) {
        if (newVal !== undefined) this._$val[0] = newVal;

        return this._$val[0];
    };

    Vec2.prototype.y = function(newVal) {
        if (newVal !== undefined) this._$val[1] = newVal;

        return this._$val[1];
    };

    Vec2.prototype.increment = function(position, value) {
        if (position < 0 || position > 1) return;

        this._$val[position] += value;
    };

    Vec2.X = 0;
    Vec2.Y = 1;

    Vec2.Zero = function() {
        return [0, 0];
    };

    Vec2.One = function() {
        return [1, 1];
    };

    const Mat22 = function(mat22) {
        this._$val = mat22 ? mat22 : Mat22.Identity();
    };

    Mat22.prototype.get = function(param) {
        return this._$val;
    };

    Mat22.prototype.set = function(newVal) {
        return this._$val = newVal;
    };

    Mat22.Identity = function() {
        return [
            [1, 0],
            [0, 1]
        ];
    };

    global.Vec2 = Vec2;
    global.Mat22 = Mat22;

})(window);
