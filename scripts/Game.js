(function (global) {
    "use strict";

    let paused = false;
    let ctx = null;

    let core = Core.GetInstance();
    core.configure({ fps: 60 });
    ctx = core.initGraphics();

    let char = new Character();
    char.configure(new Vec2([100, core.canvasDim.y() / 2 - 25]), new Vec2([5, 50]));

    core.gameCallback = function() {
        char.draw();

        if (paused === false) char.update();
        else drawPause();
    };

    Core.AddKeyListener(keyCode => {
        switch(keyCode) {
            case KeyCodes.ADD:
                core.updateFps(5);
                break;
            case KeyCodes.SUBSTRACT:
                core.updateFps(-5);
                break;
            case KeyCodes.SPACE:
                paused = !paused;
                break;

        }
    });

    function drawPause() {
        ctx.fillStyle = 'rgb(0, 255, 0)';
        ctx.font = '48px serif';
        ctx.fillText('PAUSED', core.canvasDim.x() / 2 - 144, core.canvasDim.y() / 2);
    }

    core.start(true);

})(window);
