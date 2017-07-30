"use strict";
export default class Color {

    constructor(color) {
        this._$val = color ? color : 0;
    }

    change(color) {
        this._$val = color
    }

    toString() {
        return this._$val.toString(16);
    }

    get Red() {
        return this._$val & Color.RED;
    }

    get Green() {
        return (this._$val & Color.GREEN) >> 8;
    }

    get Blue() {
        return (this._$val & Color.BLUE) >> 16;
    }

    get Alpha() {
        return (this._$val & Color.ALPHA) >> 24;
    }

    static get RED() {
        return 0xFF;
    }

    static get GREEN() {
        return 0xFF00;
    }

    static get BLUE() {
        return 0xFF0000;
    }

    static get ALPHA() {
        return 0xFF000000;
    }
}
