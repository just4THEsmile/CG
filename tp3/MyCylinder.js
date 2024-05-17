import { CGFobject } from '../lib/CGF.js';
/**
 * MyCylinder2
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    initBuffers() {
        // Initialize arrays for vertices, indices, and normals
        this.vertices = [];
        this.indices = [];
        this.normals = [];
    
        let angle = 2 * Math.PI / this.slices;

        for(let stack = 0; stack <= this.stacks; stack++) {
            for(let slice = 0; slice < this.slices; slice++) {
                let x = Math.cos(slice * angle);
                let y = Math.sin(slice * angle);
                this.vertices.push(x, y, stack / this.stacks);
                this.normals.push(x, y, 0);
            }
        }

        for(let stack = 0; stack < this.stacks; stack++) {
            for(let slice = 0; slice < this.slices; slice++) {
                let first = stack * this.slices + slice;
                let second = first + this.slices;
                this.indices.push(first, second + 1, second);
                this.indices.push(first, first + 1, second + 1);
            }
        }

        
        this.primitiveType = this.scene.gl.TRIANGLES;
    
        this.initGLBuffers();
    }

    updateBuffers(complexity){
    }
}