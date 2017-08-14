import Core from "../Core"

export default class ParticlesEmitter {

    constructor() {
        this._particles = [];
        this._pointer = 0;
    }

    add(particles) {
        if (Array.isArray(particles))
            this._particles = this._particles.concat(particles);
        else
            this._particles.push(particles);
    }

    emit() {
        this._particles.forEach(particleObject => {
            if (Core.Time < particleObject.EndTime) particleObject.draw()
        });
    }

    static get Instance() { return ParticlesEmitter._instance }

}

ParticlesEmitter._instance = new ParticlesEmitter();
