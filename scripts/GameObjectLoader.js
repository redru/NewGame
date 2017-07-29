"use strict";
import Pj       from "./gameobjects/Pj"
import Enemy    from "./gameobjects/Enemy"
import Disk     from "./gameobjects/Disk"

const __objects_list = {
    'Pj'    : Pj,
    'Enemy' : Enemy,
    'Disk'  : Disk
};

export default class GameObjectLoader {

    static ObjectNewInstance(name) {
        if (!__objects_list.hasOwnProperty(name)) return null;

        return new __objects_list[name]();
    }

}
