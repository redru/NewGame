(function (global) {
    "use strict";

    let core = Core.GetInstance();
    core.configure({ fps: 60 });
    core.initGraphics();

    let char = new Character();
    char.configure({ x: 50, y: (core.canvasDim.height / 2) - 25 }, { width: 5, height: 50 });

    core.gameCallback = function() {
        char.update();
        char.draw();
    };

    Core.AddKeyListener(keyCode => {
        switch(keyCode) {
            case KeyCodes.ADD:
                core.updateFps(5);
                break;
            case KeyCodes.SUBSTRACT:
                core.updateFps(-5);
                break;
        }
    });

    core.start(true);

})(window);
