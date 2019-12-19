"use strict";
var T05_Compression;
(function (T05_Compression) {
    class GridElement {
        constructor(_cube = null) {
            this.cube = _cube;
        }
        get position() {
            if (this.cube)
                return this.cube.cmpTransform.local.translation;
            return null;
        }
        set position(_new) {
            if (this.cube)
                this.cube.cmpTransform.local.translation = _new;
        }
    }
    T05_Compression.GridElement = GridElement;
    class Grid extends Map {
        // private grid: Map<string, Cube> = new Map();
        constructor() {
            super();
        }
        push(_position, _element = null) {
            let key = this.toKey(_position);
            if (this.pop(_position))
                T05_Compression.ƒ.Debug.warn("Grid push to occupied position, popped: ", key);
            this.set(key, _element);
            if (_element)
                T05_Compression.game.appendChild(_element.cube);
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
                T05_Compression.game.removeChild(element.cube);
            return element;
        }
        findNeighbors(_of, _empty = false) {
            let found = [];
            let empty = [];
            let offsets = [[0, 0, 1], [0, 0, -1], [0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0]];
            for (let offset of offsets) {
                let posNeighbor = T05_Compression.ƒ.Vector3.SUM(_of, new T05_Compression.ƒ.Vector3(...offset));
                let neighbor = T05_Compression.grid.pull(posNeighbor);
                if (neighbor)
                    found.push(neighbor);
                else
                    empty.push(posNeighbor);
            }
            return _empty ? empty : found;
        }
        compress() {
            let movesGain = [];
            for (let element of this) {
                let emptySpaces = this.findNeighbors(element[1].position, true);
                for (let target of emptySpaces) {
                    let relativeGain = element[1].position.magnitude / target.magnitude;
                    if (relativeGain > 1) {
                        let move = { value: relativeGain, target: target, element: element[1] };
                        movesGain.push(move);
                    }
                }
            }
            movesGain.sort((_a, _b) => _a.value < _b.value ? 1 : -1);
            let movesChosen = [];
            for (let move of movesGain) {
                let alreadyChosen = movesChosen.findIndex((_move) => _move.target.equals(move.target) || _move.element == move.element);
                if (alreadyChosen == -1)
                    movesChosen.push(move);
            }
            return movesChosen;
        }
        toKey(_position) {
            let position = _position.map(Math.round);
            let key = position.toString();
            return key;
        }
    }
    T05_Compression.Grid = Grid;
})(T05_Compression || (T05_Compression = {}));
//# sourceMappingURL=Grid.js.map