namespace T02_Grid {

    import fudge = FudgeCore;

    export class Grid {
        
        public grid: boolean[][][];

        constructor(_size: number) {

            this.grid = new boolean[_size][_size][_size];
        }

        public setGrid(_pos: fudge.Vector3): boolean {

            if (!this.grid[_pos.x + this.grid.length / 2][_pos.y + this.grid.length / 2][_pos.z + this.grid.length / 2]) {

                this.grid[_pos.x + this.grid.length / 2][_pos.y + this.grid.length / 2][_pos.z + this.grid.length / 2] = true;
                return true;

            } else {

                return false;
            }
        }

        public getGrid(_pos: fudge.Vector3): boolean {

            if (this.grid[_pos.x + this.grid.length / 2][_pos.y + this.grid.length / 2][_pos.z + this.grid.length / 2]) {

                return true;

            } else {

                return false;
            }
       }
    }
}