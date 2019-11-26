namespace T02_Grid {

    import fudge = FudgeCore;

    export enum CUBE_TYPE {

        GREEN = "Green",
        RED = "Red",
        BLUE = "Blue",
        YELLOW = "Yellow",
        MAGENTA = "Magenta",
        CYAN = "Cyan"
    }

    type Materials = Map<CUBE_TYPE, fudge.Material>;

    export class Cube extends fudge.Node {

        private static mesh: fudge.MeshCube = new fudge.MeshCube();
        private static materials: Materials = Cube.createMaterials();

        constructor(_type: CUBE_TYPE, _position: fudge.Vector3) {

            super("Cube." + _type);

            let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(Cube.mesh);
            this.addComponent(cmpMesh);

            let cmpMaterial: fudge.ComponentMaterial = new fudge.ComponentMaterial(Cube.materials.get(_type));
            this.addComponent(cmpMaterial);

            let cmpTransform: fudge.ComponentTransform = new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(_position));

            this.addComponent(cmpTransform);
        }

        private static createMaterials(): Materials {

            return new Map([
                [CUBE_TYPE.RED, new fudge.Material(CUBE_TYPE.RED, fudge.ShaderFlat, new fudge.CoatColored(fudge.Color.RED))],
                [CUBE_TYPE.GREEN, new fudge.Material(CUBE_TYPE.GREEN, fudge.ShaderFlat, new fudge.CoatColored(fudge.Color.GREEN))],
                [CUBE_TYPE.BLUE, new fudge.Material(CUBE_TYPE.BLUE, fudge.ShaderFlat, new fudge.CoatColored(fudge.Color.BLUE))],
                [CUBE_TYPE.MAGENTA, new fudge.Material(CUBE_TYPE.MAGENTA, fudge.ShaderFlat, new fudge.CoatColored(fudge.Color.MAGENTA))],
                [CUBE_TYPE.YELLOW, new fudge.Material(CUBE_TYPE.YELLOW, fudge.ShaderFlat, new fudge.CoatColored(fudge.Color.YELLOW))],
                [CUBE_TYPE.CYAN, new fudge.Material(CUBE_TYPE.CYAN, fudge.ShaderFlat, new fudge.CoatColored(fudge.Color.CYAN))]
            ]);
        }
    }
}