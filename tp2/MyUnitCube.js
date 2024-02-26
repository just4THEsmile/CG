import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initBuffers();
	}
    initBuffers(){
        this.vertices = [
            -0.5, -0.5, 0.5,  // 0
             0.5, -0.5, 0.5,  // 1
            -0.5,  0.5, 0.5,  // 2
             0.5,  0.5, 0.5,  // 3
            -0.5, -0.5, -0.5,  // 4
             0.5, -0.5,  -0.5,  // 5
            -0.5,  0.5,  -0.5,  // 6
             0.5,  0.5,  -0.5   // 7
        ];

        this.indices = [
            2,3,6,7,6,3,
            5,1,0,4,5,0,
            1,5,3,7,3,5,
            2,4,0,4,2,6,
            3,2,0,1,3,0,
            5,4,7,6,7,4
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();   
    }
}   