"use strict";
export default class Color {

    constructor(color) {
        this._$val = color ? color : 0x000000;
    }

    change(color) {
        if (!color) {
            this._$val = 0x000000;
            return;
        }

        this._$val = typeof color === 'string' ? parseInt(color) : color;
    }

    toString() {
        return this._$val.toString(16);
    }

    toRgb() {
        return `rgb(${this._$val & Color.RED},${(this._$val & Color.GREEN) >> 8},${(this._$val & Color.BLUE) >> 16})`;
    }

    toRgba() {
        return `rgb(${this._$val & Color.RED},${(this._$val & Color.GREEN) >> 8},${(this._$val & Color.BLUE) >> 16},${(this._$val & Color.ALPHA) >> 24})`;
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
