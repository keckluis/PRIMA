namespace FudgeCore {
    /**
     * Single color shading
     * @authors Jascha Karagöl, HFU, 2019 | Jirka Dell'Oro-Friedl, HFU, 2019
     */
    export class ShaderUniColor extends Shader {
        public static getCoat(): typeof Coat {
            return CoatColored;
        }

        public static getVertexShaderSource(): string {
            return `#version 300 es

                    in vec3 a_position;
                    uniform mat4 u_projection;
                    
                    void main() {   
                        gl_Position = u_projection * vec4(a_position, 1.0);
                    }`;
        }
        public static getFragmentShaderSource(): string {
            return `#version 300 es
                    precision mediump float;
                    
                    uniform vec4 u_color;
                    out vec4 frag;
                    
                    void main() {
                       frag = u_color;
                    }`;
        }
    }
}