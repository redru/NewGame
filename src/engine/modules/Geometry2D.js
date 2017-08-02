"use strict";
export class Vec2 {

    constructor(vec2) {
        this.__$val = vec2 ? vec2 : Vec2.One;
    }

    increment(v1, v2) {
        this.__$val[0] += v1;
        this.__$val[1] += v2;
    }

    substractVector(v) {
        this.__$val[0] -= v.X;
        this.__$val[1] -= v.Y;
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

    toRotation() {
        return Math.atan2(this.__$val[0], this.__$val[1]) * 180/ Math.PI;
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

    set Width(value) {
        this.__$val[0] = value;
    }

    get Width() {
        return this.__$val[0];
    }

    set Height(value) {
        this.__$val[1] = value;
    }

    get Height() {
        return this.__$val[1];
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

    // v' = 2 * (v . n) * n - v;
    // Vect2 = Vect1 - 2 * WallN * (WallN DOT Vect1)
    // V-=2*Normal_wall*(Normal_wall.V)
    static Reflect(direction, normal) {
        let reflected = Vec2.MultiplyScalar(normal, Vec2.DotProduct(direction, normal) * 2);
        return Vec2.Substract(direction, reflected);
    }

    static get Zero() { return new Vec2([0, 0]) }

    static get One() { return new Vec2([1, 1]) }

    static get StdNormal() { return new Vec2([1, 0]) }
}
