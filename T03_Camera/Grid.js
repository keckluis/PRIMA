"use strict";
var T03_Camera;
(function (T03_Camera) {
    var fudge = FudgeCore;
    class GridElement {
        constructor(_cube = null) {
            this.cube = _cube;
        }
    }
    T03_Camera.GridElement = GridElement;
    class Grid extends Map {
        // private grid: Map<string, Cube> = new Map();
        constructor() {
            super();
            this.push(fudge.Vector3.ZERO(), new GridElement(new T03_Camera.Cube(T03_Camera.CUBE_TYPE.GREY, fudge.Vector3.ZERO())));
        }
        push(_position, _element = null) {
            let key = this.toKey(_position);
            this.set(key, _element);
            if (_element)
                T03_Camera.game.appendChild(_element.cube);
        }
        pull(_position) {
            let key = this.toKey(_position);
            let element = this.get(key);
            return element;
        }
        pop(_position) {
            let key = this.toKey(_position);
            let element = this.get(key);
            this.delete(key);
            if (element)
                T03_Camera.game.removeChild(element.cube);
            return element;
        }
        toKey(_position) {
            let position = _position.map(Math.round);
            let key = position.toString();
            return key;
        }
    }
    T03_Camera.Grid = Grid;
})(T03_Camera || (T03_Camera = {}));
//# sourceMappingURL=Grid.js.map