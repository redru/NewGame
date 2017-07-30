"use strict";
export default class Chrono {

    constructor() {
        this.__$t1      = 0;
        this.__$t2      = 0;
        this.__$elapsed = 0;
    }

    start() {
        this.__$t1 = performance.now();
        this.__$t2 = 0;
        this.__$elapsed = 0;
    }

    stop() {
        const tmpValue = performance.now() - this.__$t1;
        this.__$t1 = 0;
        this.__$t2 = 0;
        this.__$elapsed = 0;

        return tmpValue;
    }

    step() {
        this.__$t2 = performance.now();
        this.__$elapsed = this.__$t2 - this.__$t1;
        this.__$t1 = this.__$t2;

        return this.__$elapsed;
    }

    get Elapsed() { return this.__$elapsed }

};

Chrono.static = new Chrono();
