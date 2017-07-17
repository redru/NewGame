(function (global) {
    "use strict";

    const Core = function() {
        this.canvas         = null;
        this.ctx            = null;
        this.canvasDim      = { };
        this.fps            = 30;
        this.sleepTime      = 1000 / this.fps;
        this.intervalId     = -1;
        this.gameCallback   = function() { };
        this.time           = 0;
    };

    /**
     *
     * @param {Object} configuration
     * @param {number} configuration.fps
     * @param {number} [configuration.sleepTime]
     */
    Core.prototype.configure = function(configuration) {
        this.fps = configuration.fps;
        this.sleepTime = configuration.sleepTime ? configuration.sleepTime : 1000 / configuration.fps;
    };

    Core.prototype.initGraphics = function(target) {
        this.canvas = document.getElementById(target ? target : '2DBoard');
        this.ctx = this.canvas.getContext('2d');
        this.canvasDim = {
            width   : parseInt(this.canvas.style.width.replace('px', '')),
            height  : parseInt(this.canvas.style.height.replace('px', ''))
        };

        return this.ctx;
    };

    Core.prototype.clearScreen = function() {
        this.ctx.fillStyle = 'rgb(0,0,0)';
        this.ctx.fillRect(0, 0, this.canvasDim.width, this.canvasDim.height);
    };

    Core.prototype.addKey = function(keyCode) {
        Core.pressedKeys[keyCode] = true;
    };

    Core.prototype.removeKey = function(keyCode) {
        Core.pressedKeys[keyCode] = false;
    };

    Core.prototype.start = function() {
        this.intervalId = setInterval(() => {
            this.time += this.sleepTime;
            this.clearScreen();

            this.gameCallback(this.time);
        }, this.sleepTime);
    };

    Core.prototype.stop = function() {
        clearInterval(this.intervalId);
    };

    Core.prototype.restart = function() {
        this.stop();
        this.start();
    };

    Core.prototype.updateFps = function(fps) {
        this.fps = fps;
        this.sleepTime = 1000 / fps;

        this.restart();
    };

    // EXPORT SECTION --------------------------------------------------------------------------------------------------
    const core = new Core();

    Core.pressedKeys = { };

    window.addEventListener('keydown', (event) => {
        core.addKey(event.keyCode)
    });

    window.addEventListener('keyup', (event) => {
        core.removeKey(event.keyCode)
    });

    global.Core = {
        GetCoreInstance: () => { return core; },
        isKeyPressed: function(keyCode) {
            return Core.pressedKeys[keyCode] === true;
        }
    };

})(window);
