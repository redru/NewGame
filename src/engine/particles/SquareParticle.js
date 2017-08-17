import ParticleObject from "./ParticleObject";

export default class SquareParticle extends ParticleObject {

    constructor(position, duration, direction, velocity, color) {
        super('square', position, duration, direction, velocity, color);
    }

    draw() {
        const currentPosition = this.CurrentPosition;

        this.Ctx.save();
        this.Ctx.fillStyle = this.Color.toRgb();
        this.Ctx.fillRect(currentPosition.X, currentPosition.Y, 3, 3);
        this.Ctx.restore();
    }



}
