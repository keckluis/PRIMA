"use strict";
var T02_Grid;
(function (T02_Grid) {
    class Grid {
        constructor(_size) {
            this.grid = new boolean[_size][_size][_size];
        }
        setGrid(_pos) {
            if (!this.grid[_pos.x + this.grid.length / 2][_pos.y + this.grid.length / 2][_pos.z + this.grid.length / 2]) {
                this.grid[_pos.x + this.grid.length / 2][_pos.y + this.grid.length / 2][_pos.z + this.grid.length / 2] = true;
                return true;
            }
            else {
                return false;
            }
        }
        getGrid(_pos) {
            if (this.grid[_pos.x + this.grid.length / 2][_pos.y + this.grid.length / 2][_pos.z + this.grid.length / 2]) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    T02_Grid.Grid = Grid;
})(T02_Grid || (T02_Grid = {}));
//# sourceMappingURL=Grid.js.map