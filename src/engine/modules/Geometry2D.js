"use strict";
export class Vec2 {

    constructor(vec2) {
        this._$val = vec2 ? vec2 : Vec2.One;
    }

    increment(position, value) {
        if (position < 0 || position > 1) return;

        this._$val[position] += value;
    }

    sumScalar(scalar) {
        this._$val[0] += scalar;
        this._$val[1] += scalar;
    }

    multiplyScalar(scalar) {
        this._$val[0] *= scalar;
        this._$val[1] *= scalar;
    }

    copy(vec2) {
        this._$val[0] = vec2._$val[0];
        this._$val[1] = vec2._$val[1];
    }

    copyFromArray(vec) {
        this.x = vec[0];
        this.y = vec[1];
    }

    rotate(angle) {
        let theta   = angle * Math.PI / 180;
        let cs      = Math.cos(theta);
        let sn      = Math.sin(theta);

        let rx      = this._$val[0] * cs - this._$val[1] * sn;
        let ry      = this._$val[0] * sn + this._$val[1] * cs;

        this._$val[0] = rx;
        this._$val[1] = ry;

        return this;
    }

    rotation(angle) {
        let theta   = angle * Math.PI / 180;
        let cs      = Math.cos(theta);
        let sn      = Math.sin(theta);

        return new Vec2([
            this._$val[0] * cs - this._$val[1] * sn,
            this._$val[0] * sn + this._$val[1] * cs
        ]);
    }

    set x(value) {
        this._$val[0] = value;
    }

    get x() {
        return this._$val[0];
    }

    set y(value) {
        this._$val[1] = value;
    }

    get y() {
        return this._$val[1];
    }

    static GetNormalRotated(angle) {
        let normal  = Vec2.StdNormal;
        let theta   = angle * Math.PI / 180;
        let cs      = Math.cos(theta);
        let sn      = Math.sin(theta);

        return new Vec2([
            normal.x * cs - normal.y * sn,
            normal.x * sn + normal.y * cs
        ]);
    }

    static get X() { return 0 };

    static get Y() { return 1 };

    static get Zero() { return new Vec2([0, 0]) }

    static get One() { return new Vec2([1, 1]) }

    static get StdNormal() { return new Vec2([1, 0]) }
}

/*export function Mat22(mat22) {
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
};*/
