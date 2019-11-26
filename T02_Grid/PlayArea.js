"use strict";
var T02_Grid;
(function (T02_Grid) {
    class PlayArea {
        constructor() {
            this.grid = {};
        }
        setGrid(_cube, _pos) {
            if (this.grid[_pos.x.toString() + " " + _pos.y.toString() + " " + _pos.z.toString()] == null) {
                this.grid[_pos.x.toString() + " " + _pos.y.toString() + " " + _pos.z.toString()] = _cube;
                return true;
            }
            else {
                return false;
            }
        }
        getGrid(_pos) {
            if (this.grid[_pos.x.toString() + " " + _pos.y.toString() + " " + _pos.z.toString()] != null) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    T02_Grid.PlayArea = PlayArea;
})(T02_Grid || (T02_Grid = {}));
//# sourceMappingURL=PlayArea.js.map