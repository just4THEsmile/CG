import {CGFobject} from '../lib/CGF.js';

export class MySphere extends CGFobject {

    constructor(scene, slices, stacks) {

        super(scene);
        
        this.slices = slices;
        this.stacks = stacks;
        
        this.initBuffers();
    
    }

    initBuffers() {

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for(let stack = 0; stack <= this.stacks; stack++) {

            let theta = stack * Math.PI / this.stacks;
            let sinTheta = Math.sin(theta);
            let cosTheta = Math.cos(theta);

            for(let slice = 0; slice <= this.slices; slice++) {
                    
                let angle = slice * 2 * Math.PI / this.slices;
                let sinAngle = Math.sin(angle);
                let cosAngle = Math.cos(angle);

                let x = cosAngle * sinTheta;
                let y = cosTheta;
                let z = sinAngle * sinTheta;

                let u = slice / this.slices;
                let v = stack / this.stacks;
                let new_u = 1 - u;

                this.vertices.push(x, y, z);
                this.normals.push(x, y, z);
                this.texCoords.push(new_u, v);

            } 
        }

        for(let stack = 0; stack < this.stacks; stack++) {

            for(let slice = 0; slice < this.slices; slice++) {

                let first = (stack * (this.slices + 1)) + slice;
                let second = first + this.slices + 1;

                this.indices.push(first + 1, second, first);
                this.indices.push(first + 1, second + 1, second);

            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();

    }
}