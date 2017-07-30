import Core         from "../Core"
import GameObject   from "./GameObject"

export default class RectangleGameObject extends GameObject {

    constructor() {
        super();
        this.__$ctx = Core.Instance.Ctx;
    }

    draw() {

    }

    update() { }

}
