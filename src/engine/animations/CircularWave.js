"use strict";
import Core     from "../Core"
import { Vec2 } from "../modules/Geometry2D";

export default class CircularWave {

    constructor(position, waves, delay, interval, startAngle, endAngle) {
        this.intervalId     = null;
        this.position       = position;
        this.waves          = waves;
        this.intervalTime   = interval;
        this.startDelay     = delay;
        this.startAngle     = startAngle > 0 && startAngle <= 360 ? startAngle : 0;
        this.endAngle       = endAngle > 0 && endAngle <= 360 ? endAngle : 0;

        this.startDelay > 0 ? this.startWithDelay() : this.start();
    }

    start() {
        if (this.waves > 1) {
            let emittedWavesCount = 0;

            this.intervalId = setInterval(() => {
                if (emittedWavesCount >= this.waves) {
                    clearInterval(this.intervalId);
                    return;
                }

                this.emitWave();

                emittedWavesCount++;
            }, this.intervalTime);
        } else {
            this.emitWave();
        }
    }

    startWithDelay() {
        setTimeout(() => {
            this.start();
        }, this.startDelay);
    }

    emitWave() {
        for (let count = 0; count < 100; count++)
            Core.ParticlesEmitter.add(this.position, 2000, Vec2.GetNormalizedVector(Math.random() * 360), 40, 0xFFFF0000);
    }

}
