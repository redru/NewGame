"use strict";
let __$logArea = null;

export default class Logger {

    static InitializeLogArea(id) {
        __$logArea = document.getElementById(id ? id : 'LogArea');
    }

    static Append(text) {
        __$logArea.value += `${text}\n`;
        __$logArea.scrollTop = __$logArea.scrollHeight;
    }

}
