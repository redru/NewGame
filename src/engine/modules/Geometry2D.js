"use strict";
export class Vec2 {

    constructor(vec) {
        if (!vec) this._val = Vec2.Zero;
        else this._val = Array.isArray(vec) ? [vec[0], vec[1]] : [vec.X, vec.Y];
    }

    increment(x, y) {
        this._val[0] += x;
        this._val[1] += y;
    }

    substractVector(vec) {
        this._val[0] -= vec._val[0];
        this._val[1] -= vec._val[1];
    }

    sumScalar(scalar) {
        this._val[0] += scalar;
        this._val[1] += scalar;
    }

    multiplyScalar(scalar) {
        this._val[0] *= scalar;
        this._val[1] *= scalar;
    }

    copy(vec) {
        this._val[0] = vec._val[0];
        this._val[1] = vec._val[1];
    }

    toRotation() {
        return Math.atan2(this._val[1], this._val[0]) * 180 / Math.PI;
    }

    copyFromArray(vec) {
        this.X = vec[0];
        this.Y = vec[1];
    }

    rotate(angle) {
        let theta   = angle * Math.PI / 180;
        let cs      = Math.cos(theta);
        let sn      = Math.sin(theta);

        let rx      = this._val[0] * cs - this._val[1] * sn;
        let ry      = this._val[0] * sn + this._val[1] * cs;

        this._val[0] = rx;
        this._val[1] = ry;

        return this;
    }

    rotation(angle) {
        let theta   = angle * Math.PI / 180;
        let cs      = Math.cos(theta);
        let sn      = Math.sin(theta);

        return new Vec2([
            this._val[0] * cs - this._val[1] * sn,
            this._val[0] * sn + this._val[1] * cs
        ]);
    }

    set X(value) {
        this._val[0] = value;
    }

    get X() {
        return this._val[0];
    }

    set Y(value) {
        this._val[1] = value;
    }

    get Y() {
        return this._val[1];
    }

    set Width(value) {
        this._val[0] = value;
    }

    get Width() {
        return this._val[0];
    }

    set Height(value) {
        this._val[1] = value;
    }

    get Height() {
        return this._val[1];
    }

    static SumScalar(v, scalar) {
        return new Vec2([v.X + scalar, v.Y + scalar]);
    }

    static Substract(v1, v2) {
        return new Vec2([v1.X - v2.X, v1.Y - v2.Y]);
    }

    static MultiplyScalar(v, scalar) {
        return new Vec2([v.X * scalar, v.Y * scalar]);
    }

    static DotProduct(v1, v2) {
        return v1.X * v2.X + v1.Y * v2.Y;
    }

    static GetNormal(angle) {
        let normal  = Vec2.StdNormal;
        let theta   = angle * Math.PI / 180;
        let cs      = Math.cos(theta);
        let sn      = Math.sin(theta);

        return new Vec2([
            normal.X * cs - normal.Y * sn,
            normal.X * sn + normal.Y * cs
        ]);
    }

    // v' = 2 * (v . n) * n - v;
    // Vect2 = Vect1 - 2 * WallN * (WallN DOT Vect1)
    // V-=2*Normal_wall*(Normal_wall.V)
    static Reflect(direction, normal) {
        let reflected = Vec2.MultiplyScalar(normal, Vec2.DotProduct(direction, normal) * 2);
        return Vec2.Substract(direction, reflected);
    }

    static Copy(vec) {
        return new Vec2(Array.isArray(vec) ? [vec[0], vec[1]] : [vec.X, vec.Y]);
    }

    static get Zero() { return new Vec2([0, 0]) }

    static get One() { return new Vec2([1, 1]) }

    static get StdNormal() { return new Vec2([1, 0]) }
}

export class Util2D {

    static ToRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    static ToDegrees(radians) {
        return radians * 180 / Math.PI;
    }

    static AdjustRotation(rotation) {
        if (rotation < 0) rotation += 360;
        else if (rotation >= 360) rotation -= 360;

        return rotation;
    }

}
