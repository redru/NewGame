(function (global) {
    "use strict";

    const Chrono = function() {
        this.t1         = 0;
        this.t2         = 0;
        this.elapsed    = 0;
    };

    Chrono.prototype.start = function() {
        this.t1 = performance.now();
        this.t2 = 0;
        this.elapsed = 0;
    };

    Chrono.prototype.stop = function() {
        const tmpValue = performance.now() - this.t1;
        this.t1 = 0;
        this.t2 = 0;
        this.elapsed = 0;

        return tmpValue;
    };

    Chrono.prototype.step = function() {
        this.t2 = performance.now();
        this.elapsed = this.t2 - this.t1;
        this.t1 = this.t2;

        return this.elapsed;
    };

    Chrono.static = new Chrono();

    global.Chrono = Chrono;

})(window);
