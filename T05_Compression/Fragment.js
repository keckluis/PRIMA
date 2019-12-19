"use strict";
var T05_Compression;
(function (T05_Compression) {
    var ƒ = FudgeCore;
    class Fragment extends ƒ.Node {
        constructor(_shape, _position = ƒ.Vector3.ZERO()) {
            super("Fragment-Type" + _shape);
            this.position = new ƒ.Vector3(0, 0, 0);
            let shape = Fragment.shapes[_shape];
            for (let position of shape) {
                let type;
                do {
                    type = Fragment.getRandomEnum(T05_Compression.CUBE_TYPE);
                } while (type == T05_Compression.CUBE_TYPE.BLACK);
                let vctPosition = ƒ.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                let cube = new T05_Compression.Cube(type, vctPosition);
                this.appendChild(cube);
            }
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position)));
        }
        static getRandom() {
            let shape = Math.floor(Math.random() * Fragment.shapes.length);
            let fragment = new Fragment(shape);
            return fragment;
        }
        static getShapeArray() {
            return [
                // corner
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]],
                // quad
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]],
                // s
                [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, -1, 0]]
            ];
        }
        static getRandomEnum(_enum) {
            let randomKey = Object.keys(_enum)[Math.floor(Math.random() * Object.keys(_enum).length)];
            return _enum[randomKey];
        }
    }
    Fragment.shapes = Fragment.getShapeArray();
    T05_Compression.Fragment = Fragment;
})(T05_Compression || (T05_Compression = {}));
//# sourceMappingURL=Fragment.js.map