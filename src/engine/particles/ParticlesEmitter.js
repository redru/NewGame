import Core             from "../Core"
import SquareParticle   from "./SquareParticle";

export default class ParticlesEmitter {

    constructor() {
        this._ptr               = 0;
        this._totalParticles    = 0;
        this._currentParticles  = 0;
        this._particles         = null;
    }

    initialize(totalParticles) {
        this._totalParticles = totalParticles;
        this._particles = new Array(totalParticles);

        for (let idx = 0; idx < totalParticles; idx++) {
            this._particles[idx] = new SquareParticle();
        }
    }

    add(position, duration, direction, velocity) {
        while (this._particles[this._ptr].Enabled === true) {
            if ((this._ptr++) + 1 >= this._totalParticles) {
                this._ptr = 0;
                return;
            }
        }

        let tmp = this._particles[this._ptr];
        tmp.StartingPosition    = position;
        tmp.Duration            = duration;
        tmp.Direction           = direction;
        tmp.Velocity            = velocity;
        tmp.Enabled             = true;

        this._currentParticles++;
    }

    emit() {
        let localCounter = 0;

        for (let index in this._particles) {
            if (localCounter >= this._currentParticles) return;

            let particleObject = this._particles[index];

            if (particleObject.Enabled) {
                if (Core.Time > particleObject.EndTime) {
                    particleObject.Enabled = false;
                    this._currentParticles--;
                } else {
                    particleObject.draw();
                    localCounter++;
                }
            }
        }
    }

    get CurrentParticles() { return this._currentParticles }

    static get Instance() { return ParticlesEmitter._instance }

}

ParticlesEmitter._instance = new ParticlesEmitter();
