import ParticleObject from "./ParticleObject";

export default class SquareParticle extends ParticleObject {

    constructor(position, duration, direction, velocity, color) {
        super('square', position, duration, direction, velocity, color);
    }

    draw() {
        let currentPosition = this.CurrentPosition;
        this.Ctx.save();
        this.Ctx.fillStyle = `rgba(${this.Color.Red},${this.Color.Green},${this.Color.Blue},${this.Color.Alpha * this.ReverseAlphaProgress})`;
        this.Ctx.fillRect(currentPosition.X, currentPosition.Y, 3, 3);
        this.Ctx.restore();
    }



}
