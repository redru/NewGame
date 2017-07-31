"use strict";
const __$objectsList = { };
let __$idCounter = 0;

export default class GameObjectLoader {

    static RegisterObject(name, prototype) {
        __$objectsList[name] = prototype;
    }

    static RegisterObjects(names, prototypes) {
        names.forEach((name, index) => {
            __$objectsList[name] = prototypes[index];
        });
    }

    static ObjectNewInstance(name) {
        if (!__$objectsList.hasOwnProperty(name)) return null;

        const tmp = new __$objectsList[name]();
        tmp.Id = __$idCounter++;

        return tmp;
    }

}
