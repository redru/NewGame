"use strict";
export function Vec2(vec2) {
    this._$val = vec2 ? vec2 : Vec2.One();
}

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

Vec2.prototype.sumScalar = function(scalar) {
    this._$val[0] += scalar;
    this._$val[1] += scalar;
};

Vec2.prototype.multiplyScalar = function(scalar) {
    this._$val[0] *= scalar;
    this._$val[1] *= scalar;
};

Vec2.prototype.copy = function(vec) {
    this.x(vec.x());
    this.y(vec.y());
};

Vec2.prototype.copyFromArray = function(vec) {
    this.x(vec[0]);
    this.y(vec[1]);
};

Vec2.X = 0;
Vec2.Y = 1;

Vec2.Zero = function() {
    return new Vec2([0, 0]);
};

Vec2.One = function() {
    return new Vec2([1, 1]);
};


export function Mat22(mat22) {
    this._$val = mat22 ? mat22 : Mat22.Identity();
}

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

window.Vec2 = Vec2;
window.Mat22 = Mat22;
