import ParticleObject from "./ParticleObject";
import Logger from "../modules/Logger";

export default class SquareParticle extends ParticleObject {

    constructor(position, duration, direction, velocity) {
        super('square', position, duration, direction, velocity);
    }

    draw() {
        const currentPosition = this.CurrentPosition;
        Logger.Append(currentPosition.X + ' / ' + currentPosition.Y);

        this.Ctx.save();
        this.Ctx.fillStyle = 'rgb(255, 255, 255)';
        this.Ctx.fillRect(currentPosition.X, currentPosition.Y, 2, 2);
        this.Ctx.restore();
    }

}
