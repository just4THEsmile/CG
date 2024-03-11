import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangleBig
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleBig extends CGFobject {
	constructor(scene, coords) {
		super(scene);
        this.texCoords = coords;
		this.initBuffers();
	}

    initBuffers() {
        this.vertices = [
            -2, 0, 0,	//0
            2, 0, 0,	//1
            0, 2, 0,	//2
            -2, 0, 0,	//3
            2, 0, 0,	//4
            0, 2, 0,	//5
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2,
            3, 5, 4
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1
        ]

        

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}