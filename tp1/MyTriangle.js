import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

    initBuffers(){
        this.vertices = [ 
            -1,0,0, //0
            0,-1,0, //1
            0,1,0, //2
            1,0,0 //3
        ];
        this.indices = [
            0,1,2,
            1,3,2
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}