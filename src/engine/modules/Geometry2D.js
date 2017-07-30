"use strict";
export class Vec2 {

    constructor(vec2) {
        this.__$val = vec2 ? vec2 : Vec2.One;
    }

    increment(v1, v2) {
        this.__$val[0] += v1;
        this.__$val[1] += v2;
    }

    sumScalar(scalar) {
        this.__$val[0] += scalar;
        this.__$val[1] += scalar;
    }

    multiplyScalar(scalar) {
        this.__$val[0] *= scalar;
        this.__$val[1] *= scalar;
    }

    copy(vec2) {
        this.__$val[0] = vec2.__$val[0];
        this.__$val[1] = vec2.__$val[1];
    }

    copyFromArray(vec) {
        this.X = vec[0];
        this.Y = vec[1];
    }

    rotate(angle) {
        let theta   = angle * Math.PI / 180;
        let cs      = Math.cos(theta);
        let sn      = Math.sin(theta);

        let rx      = this.__$val[0] * cs - this.__$val[1] * sn;
        let ry      = this.__$val[0] * sn + this.__$val[1] * cs;

        this.__$val[0] = rx;
        this.__$val[1] = ry;

        return this;
    }

    rotation(angle) {
        let theta   = angle * Math.PI / 180;
        let cs      = Math.cos(theta);
        let sn      = Math.sin(theta);

        return new Vec2([
            this.__$val[0] * cs - this.__$val[1] * sn,
            this.__$val[0] * sn + this.__$val[1] * cs
        ]);
    }

    set X(value) {
        this.__$val[0] = value;
    }

    get X() {
        return this.__$val[0];
    }

    set Y(value) {
        this.__$val[1] = value;
    }

    get Y() {
        return this.__$val[1];
    }

    static GetNormalRotated(angle) {
        let normal  = Vec2.StdNormal;
        let theta   = angle * Math.PI / 180;
        let cs      = Math.cos(theta);
        let sn      = Math.sin(theta);

        return new Vec2([
            normal.X * cs - normal.Y * sn,
            normal.X * sn + normal.Y * cs
        ]);
    }

    static get Zero() { return new Vec2([0, 0]) }

    static get One() { return new Vec2([1, 1]) }

    static get StdNormal() { return new Vec2([1, 0]) }
}

/*export function Mat22(mat22) {
    this.__$val = mat22 ? mat22 : Mat22.Identity();
}

Mat22.prototype.get = function(param) {
    return this.__$val;
};

Mat22.prototype.set = function(newVal) {
    return this.__$val = newVal;
};

Mat22.Identity = function() {
    return [
        [1, 0],
        [0, 1]
    ];
};*/
