import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
    constructor(scene, size = 1) {
        super(scene);
        this.size = size;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            -1 * this.size, 1 * this.size, 0, //0
            -1 * this.size, -1 * this.size, 0, //1
            1 * this.size, -1 * this.size, 0, //2
        ];

        // Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2, // Front face
            2, 1, 0, // Back face
        ];

        // The defined indices (and corresponding vertices)
        // will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}