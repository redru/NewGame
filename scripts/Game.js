(function (global) {
    "use strict";

    let core = Core.GetCoreInstance();
    core.configure({ fps: 30 });

    let ctx = core.initGraphics();

    let char = new Character();
    char.configure({ x: 50, y: (core.canvasDim.height / 2) - 25 }, { width: 5, height: 50 });

    core.gameCallback = function(time) {
        char.update(time);
        char.draw(ctx);
    };

    core.start();

})(window);
