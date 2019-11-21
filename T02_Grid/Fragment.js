"use strict";
var T02_Grid;
(function (T02_Grid) {
    var fudge = FudgeCore;
    class Fragment extends fudge.Node {
        constructor(_shape) {
            super("Fragment-Type" + _shape);
            this.position = new fudge.Vector3(0, 0, 0);
            let shape = Fragment.shapes[_shape];
            for (let position of shape) {
                let type = Fragment.getRandomEnum(T02_Grid.CUBE_TYPE);
                let vctPosition = fudge.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                let cube = new T02_Grid.Cube(type, vctPosition);
                this.appendChild(cube);
            }
            this.addComponent(new fudge.ComponentTransform());
        }
        static getShapeArray() {
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
        static getRandomEnum(_enum) {
            let randomKey = Object.keys(_enum)[Math.floor(Math.random() * Object.keys(_enum).length)];
            return _enum[randomKey];
        }
    }
    Fragment.shapes = Fragment.getShapeArray();
    T02_Grid.Fragment = Fragment;
})(T02_Grid || (T02_Grid = {}));
//# sourceMappingURL=Fragment.js.map