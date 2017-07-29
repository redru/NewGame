"use strict";

const core = Core.GetInstance();

const GameConfiguration = {
    BOARD_DIMENSION     : new Vec2([1280, 720]),

    PJ_INIT_SIZE        : new Vec2([5, 50]),
    PJ_INIT_POSITION    : new Vec2([100, core.canvasDim.y() / 2 - 25]),

    ENEMY_INIT_SIZE        : new Vec2([5, 50]),
    ENEMY_INIT_POSITION    : new Vec2([core.canvasDim.x() - 100, core.canvasDim.y() / 2 - 25])
};

window.GameConfiguration = GameConfiguration;

export { GameConfiguration as default };
