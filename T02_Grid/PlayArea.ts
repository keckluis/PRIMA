namespace T02_Grid {

    import fudge = FudgeCore;

    interface Grid {

        [code: string]: Cube;
    }

    export class PlayArea {
        
        public grid: Grid;

        constructor() {

            this.grid = {};
        }

        public setGrid(_cube: Cube, _pos: fudge.Vector3): boolean {
            
            if (this.grid[_pos.x.toString() + " " + _pos.y.toString() + " " + _pos.z.toString()] == null) {

                this.grid[_pos.x.toString() + " " + _pos.y.toString() + " " + _pos.z.toString()] = _cube;
                return true;
            } else {

                return false;
            }
        }

        public getGrid(_pos: fudge.Vector3): boolean {

            if (this.grid[_pos.x.toString() + " " + _pos.y.toString() + " " + _pos.z.toString()] != null) {

                return true;

            } else {

                return false;
            }
       }
    }
}