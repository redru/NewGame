"use strict";
export default function Color(color) {
    this._$val = color ? color : 0;
};

Color.prototype.set = function(color) {
    this._$val = color;
};

Color.prototype.get = function(mask) {
    switch (mask) {
        case Color.RED:
            return this._$val & Color.RED;
            break;
        case Color.GREEN:
            return (this._$val & Color.GREEN) >> 8;
            break;
        case Color.BLUE:
            return (this._$val & Color.BLUE) >> 16;
            break;
        case Color.ALPHA:
            return (this._$val & Color.ALPHA) >> 24;
            break;
        default:
            return 0;
    }
};

Color.RED = 0xFF;
Color.GREEN = 0xFF00;
Color.BLUE = 0xFF0000;
Color.ALPHA = 0xFF000000;
