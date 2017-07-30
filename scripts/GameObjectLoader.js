"use strict";
import Pj       from "./gameobjects/Pj"
import Enemy    from "./gameobjects/Enemy"
import Disk     from "./gameobjects/Disk"

const __$objectsList = {
    'Pj'                    : Pj,
    'Enemy'                 : Enemy,
    'Disk'                  : Disk,
    'RectangleGameObject'   : RectangleGameObject
};

export default class GameObjectLoader {

    static ObjectNewInstance(name) {
        if (!__$objectsList.hasOwnProperty(name)) return null;

        return new __$objectsList[name]();
    }

}
