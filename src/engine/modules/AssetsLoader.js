"use strict";
export default class AssetsLoader {

    constructor() {
        this.__$png = { };
    }

    loadAssets(assets) {
        if (!Array.isArray(assets)) assets = [assets];

        assets.forEach(asset => {
            switch(asset.type) {
                case "PNG":
                    this.loadPng(asset.src);
                    break;
            }
        });
    }

    loadPng(src) {
        const image = new Image();

        image.onload = function() {
            createImageBitmap(ball, 0, 0, 32, 32)
        };

        image.src = src;
    }

    loadPng(path) {
        return this.__$png[path];
    }

    static get Types() {
        return {
            PNG: 0x00
        };
    }

    static get Instance() { return AssetsLoader.__$instance }

}

AssetsLoader.__$instance = new AssetsLoader();
