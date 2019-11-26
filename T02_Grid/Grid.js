"use strict";
var T02_Grid;
(function (T02_Grid) {
    var fudge = FudgeCore;
    class GridElement {
        constructor(_cube = null) {
            this.cube = _cube;
        }
    }
    T02_Grid.GridElement = GridElement;
    class Grid extends Map {
        // private grid: Map<string, Cube> = new Map();
        constructor() {
            super();
            this.push(fudge.Vector3.ZERO(), new GridElement(new T02_Grid.Cube(T02_Grid.CUBE_TYPE.GREY, fudge.Vector3.ZERO())));
        }
        push(_position, _element = null) {
            let key = this.toKey(_position);
            this.set(key, _element);
            if (_element)
                T02_Grid.game.appendChild(_element.cube);
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
                T02_Grid.game.removeChild(element.cube);
            return element;
        }
        toKey(_position) {
            let position = _position.map(Math.round);
            let key = position.toString();
            return key;
        }
    }
    T02_Grid.Grid = Grid;
})(T02_Grid || (T02_Grid = {}));
//# sourceMappingURL=Grid.js.map