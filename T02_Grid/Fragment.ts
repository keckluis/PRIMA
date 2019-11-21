namespace T02_Grid {

    import fudge = FudgeCore;

    export class Fragment extends fudge.Node {
        
        private static shapes: number[][][] = Fragment.getShapeArray();
        public position: fudge.Vector3 = new fudge.Vector3(0, 0, 0);

        constructor(_shape: number) {

            super("Fragment-Type" + _shape);

            let shape: number[][] = Fragment.shapes[_shape];

            for (let position of shape) {

                let type: CUBE_TYPE =  Fragment.getRandomEnum(CUBE_TYPE);

                let vctPosition: fudge.Vector3 = fudge.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                let cube: Cube = new Cube(type, vctPosition); 

                this.appendChild(cube);
            }

            this.addComponent(new fudge.ComponentTransform());
        }

        private static getShapeArray(): number[][][] {

            return [
                // quad
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]],

                // long
                [[0, 0, 0], [1, 0, 0], [2, 0, 0], [3, 0, 0]],

                // L
                [[0, 0, 0], [1, 0, 0], [2, 0, 0], [2, 1, 0]],

                // corner
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]],

                //zig zag 1
                [[0, 0, 0], [1, 0, 0], [1, 1, 0], [1, 1, 1]],

                //zig zag 2
                [[0, 0, 0], [1, 0, 0], [1, 1, 0], [1, 1, -1]],

                // s
                [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, -1, 0]]
            
                // these are all shapes that can be created with 4 cubes
            ];
        }

        private static getRandomEnum<T>(_enum: {[key: string]: T}): T {

            let randomKey: string = Object.keys(_enum)[Math.floor(Math.random() * Object.keys(_enum).length)];
            return _enum[randomKey];
        }
    }
}