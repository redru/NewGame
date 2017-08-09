"use strict";
export default class Color {

    constructor(color) {
        this._val = color ? color : 0x000000;
    }

    change(color) {
        if (!color) {
            this._val = 0x000000;
            return;
        }

        this._val = typeof color === 'string' ? parseInt(color) : color;
        
        if ((this._val & Color.ALPHA) >> 24 === 0x00)
            this._val = this._val | Color.ALPHA;
        
    }

    toString() {
        return this._val.toString(16);
    }

    toRgb() {
        return `rgb(${this._val & Color.RED},${(this._val & Color.GREEN) >> 8},${(this._val & Color.BLUE) >> 16})`;
    }

    toRgba() {
        return `rgb(${this._val & Color.RED},${(this._val & Color.GREEN) >> 8},${(this._val & Color.BLUE) >> 16},${(this._val & Color.ALPHA) >> 24})`;
    }

    get Red() {
        return this._val & Color.RED;
    }

    get Green() {
        return (this._val & Color.GREEN) >> 8;
    }

    get Blue() {
        return (this._val & Color.BLUE) >> 16;
    }

    get Alpha() {
        return (this._val & Color.ALPHA) >> 24;
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
