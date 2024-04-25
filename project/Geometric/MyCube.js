import { CGFobject } from '../../lib/CGF.js';

export class MyCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [
            -1, -1, -1,  //0
             1, -1, -1,  //1
             1,  1, -1,  //2
            -1,  1, -1,  //3
            -1, -1,  1,  //4
             1, -1,  1,  //5
             1,  1,  1,  //6
            -1,  1,  1   //7
        ];

        this.indices = [
            0, 1, 2, 
            0, 2, 3,
            2, 1, 0, 
            3, 2, 0,
            4, 5, 6, 
            4, 6, 7,
            6, 5, 4, 
            7, 6, 4,
            3, 2, 6, 
            3, 6, 7,
            6, 2, 3, 
            7, 6, 3,
            0, 1, 5,
            0, 5, 4,
            5, 1, 0,
            4, 5, 0,
            1, 5, 6,
            1, 6, 2,
            6, 5, 1,
            2, 6, 1,
            0, 4, 7,
            0, 7, 3,
            7, 4, 0,
            3, 7, 0
        ];
        
        this.normals = [
            -1, -1, 1, 
            1, -1, 1,
            1, 1, 1,
            -1, 1, 1,
            -1, -1, -1,
            1, -1, -1,
            1, 1, -1,
            -1, 1, -1
        ];

        this.texCoords = [
            0, 0,
            1, 0,
            1, 1,
            0, 1,
            0, 0,
            1, 0,
            1, 1,
            0, 1
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}