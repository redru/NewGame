"use strict";
import Logger   from "./Logger"

const __$objectsList = { };
let __$idCounter = 0;

export default class GameObjectLoader {

    static RegisterObject(name, prototype) {
        __$objectsList[name] = prototype;
    }

    static RegisterObjects(names, prototypes) {
        names.forEach((name, index) => {
            __$objectsList[name] = prototypes[index];
            Logger.Append(`Initialized prototype "${name}"`);
        });
    }

    static ObjectNewInstance(name) {
        if (!__$objectsList.hasOwnProperty(name)) return null;

        const tmp = new __$objectsList[name]();
        tmp.Id = __$idCounter++;

        return tmp;
    }

}
