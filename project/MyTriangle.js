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
        
            -1 * this.size, 1 * this.size, 0, //3
            -1 * this.size, -1 * this.size, 0, //4
            1 * this.size, -1 * this.size, 0, //5
        ];
        
        this.texCoords = [
            0, 0,
            0, 1,
            1, 1,
        
            0, 0,
            0, 1,
            1, 1
        ];
        
        // Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2, // Front face
            5, 4, 3, // Back face
        ];
        
        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
        
            0, 0, -1,
            0, 0, -1,
            0, 0, -1
        ];

        this.initGLBuffers();
    }
}