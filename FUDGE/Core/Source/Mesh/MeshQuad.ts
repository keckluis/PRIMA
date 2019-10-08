namespace FudgeCore {
    /**
     * Generate a simple quad with edges of length 1, the face consisting of two trigons
     * ```plaintext
     *        0 __ 3
     *         |__|
     *        1    2             
     * ``` 
     * @authors Jirka Dell'Oro-Friedl, HFU, 2019
     */
    export class MeshQuad extends Mesh {
        public constructor() {
            super();
            this.create();
        }

        public create(): void {
            this.vertices = this.createVertices();
            this.indices = this.createIndices();
            this.textureUVs = this.createTextureUVs();
        }

        protected createVertices(): Float32Array {
            let vertices: Float32Array = new Float32Array([
                /*0*/ -1, 1, 0, /*1*/ -1, -1, 0,  /*2*/ 1, -1, 0, /*3*/ 1, 1, 0
            ]);

            vertices = vertices.map(_value => _value / 2);
            
            return vertices;
        }
        protected createIndices(): Uint16Array {
            let indices: Uint16Array = new Uint16Array([
                0, 1, 2, 0, 2, 3
            ]);
            return indices;
        }

        protected createTextureUVs(): Float32Array {
            let textureUVs: Float32Array = new Float32Array([
                // front
                /*0*/ 0, 0, /*1*/ 0, 1,  /*2*/ 1, 1, /*3*/ 1, 0
            ]);
            return textureUVs;
        }

        protected createFaceNormals(): Float32Array { return null; }
    }
}