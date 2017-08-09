"use strict";
import Logger from "./Logger"

class GameStorage {

    constructor() {
        this._gameObjectsIds = [];
        this._gameObjectsList = [];
    }

    addGameObject(gameObject) {
        if (gameObject.Id in this._gameObjectsIds) {
            Logger.Append(`Object with ID ${gameObject.Id} has already been added`);
            return;
        }

        this._gameObjectsIds.push(gameObject.Id);
        this._gameObjectsList.push(gameObject);
        Logger.Append(`[GameStorage] Added new object. Total registered ${this._gameObjectsIds.length}`);
    }

    findGameObjectByName(name) {
        for (let index in this._gameObjectsList) {
            if (name === this._gameObjectsList[index].Name)
                return this._gameObjectsList[index];
        }

        return null;
    }

    findGameObjectById(id) {
        return id in this._gameObjectsIds ?
            this._gameObjectsList[this._gameObjectsIds.indexOf(id)] :
            null;
    }

    get ObjectsList() { return this._gameObjectsList }

}

const _gameStorage = new GameStorage();

export { _gameStorage as default }
