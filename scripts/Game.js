(function (global) {
    "use strict";

    // Vars
    const updatables = [];
    const drawables  = [];

    let paused  = false;
    let ctx     = null;

    // Engine Core initialization
    // [0] Configuration
    // [1] Graphics
    let core = Core.GetInstance();
    core.configure({ fps: 60 });
    ctx = core.initGraphics(null, GameConfiguration.BOARD_DIMENSION);

    // Pj creation and setup
    let char = new Pj();
    char.configure(GameConfiguration.PJ_INIT_POSITION, GameConfiguration.PJ_INIT_SIZE);
    char.setColor(0xFFAD7A);

    updatables.push(char);
    drawables.push(char);

    // Disk creation and setup
    let disk = new Disk();
    disk.configure(new Vec2([400, 400]), GameConfiguration.PJ_INIT_SIZE);

    updatables.push(disk);
    drawables.push(disk);

    // Set game callback
    core.gameCallback = function() {
        drawables.forEach(object => object.draw());

        if (paused === false) {
            updatables.forEach(object => object.update());
        }
        else drawPause();
    };

    // Attach global keylistener
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

    // Draw pause function in case of paused game
    function drawPause() {
        ctx.fillStyle = 'rgb(0, 255, 0)';
        ctx.font = '48px serif';
        ctx.fillText('PAUSED', core.canvasDim.x() / 2 - 144, core.canvasDim.y() / 2);
    }

    // Start engine
    core.start(true);

})(window);
