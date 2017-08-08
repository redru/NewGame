"use strict";
import GameStorage  from "./GameStorage"
import Logger       from "./Logger"

const _objectsList = { };
let _idCounter = 0;

export default class GameObjectLoader {

    static RegisterObject(name, prototype) {
        _objectsList[name] = prototype;
    }

    static RegisterObjects(names, prototypes) {
        names.forEach((name, index) => {
            _objectsList[name] = prototypes[index];
            Logger.Append(`[GameObjectLoader] Initialized prototype "${name}"`);
        });
    }

    static ObjectNewInstance(name) {
        if (!_objectsList.hasOwnProperty(name)) return null;

        const tmp = new _objectsList[name]();
        tmp.Id = _idCounter++;

        GameStorage.addGameObject(tmp);

        return tmp;
    }

}
