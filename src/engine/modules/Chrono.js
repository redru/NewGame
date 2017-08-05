"use strict";
export default class Chrono {

    constructor() {
        this._t1      = 0;
        this._t2      = 0;
        this._elapsed = 0;
    }

    start() {
        this._t1 = performance.now();
        this._t2 = 0;
        this._elapsed = 0;
    }

    stop() {
        const tmpValue = performance.now() - this._t1;
        this._t1 = 0;
        this._t2 = 0;
        this._elapsed = 0;

        return tmpValue;
    }

    step() {
        this._t2 = performance.now();
        this._elapsed = this._t2 - this._t1;
        this._t1 = this._t2;

        return this._elapsed;
    }

    get Elapsed() { return this._elapsed }

};

Chrono.static = new Chrono();
