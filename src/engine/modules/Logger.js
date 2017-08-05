"use strict";
let _logArea = null;

export default class Logger {

    static InitializeLogArea(id) {
        _logArea = document.getElementById(id ? id : 'LogArea');
    }

    static Append(text) {
        console.log(text);
        _logArea.value += `${text}\n`;

        if (_logArea.value.length > Logger.Limit)
            _logArea.value = _logArea.value.substring(_logArea.value.length - Logger.Limit);

        _logArea.scrollTop = _logArea.scrollHeight;
    }

    static get Limit() { return 5000 }

}
