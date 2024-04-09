import {CGFobject} from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';

export class MyPetal extends CGFobject {

    constructor(scene, external_radius, num_petals, color_petals, hearth_radius, color_heart, stem_radius, stem_size, color_stem, color_leaves) {

        super(scene);

        this.receptacle = new MyReceptacle(scene);
        this.stem = new MyStem(scene);
        this.petals = [];
        
        this.initBuffers();

    }

    initBuffers() {
        
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
