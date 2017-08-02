"use strict";
let __$logArea = null;

export default class Logger {

    static InitializeLogArea(id) {
        __$logArea = document.getElementById(id ? id : 'LogArea');
    }

    static Append(text) {
        console.log(text);
        __$logArea.value += `${text}\n`;

        if (__$logArea.value.length > Logger.Limit)
            __$logArea.value = __$logArea.value.substring(__$logArea.value.length - Logger.Limit);

        __$logArea.scrollTop = __$logArea.scrollHeight;
    }

    static get Limit() { return 5000 }

}
