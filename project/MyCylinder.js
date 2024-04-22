import { CGFobject , CGFappearance} from '../lib/CGF.js';

export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks, radius,height) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.height = height;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        
        for(let stack = 0; stack <= this.stacks; stack++) {
            for(let slice = 0; slice <= this.slices; slice++) {
                let x = this.radius * Math.cos(slice * 2.0 * Math.PI / this.slices);
                let y = stack / this.stacks * this.height; // Modify this line
                let z = this.radius * Math.sin(slice * 2.0 * Math.PI / this.slices);
        
                this.vertices.push(x, y, z);
                this.normals.push(x, 0, z); 
                this.texCoords.push(slice / this.slices, stack / this.stacks);
        
                if(stack < this.stacks && slice < this.slices) {
                    let first = stack * (this.slices + 1) + slice;
                    let second = first + this.slices + 1;
        
                    this.indices.push(first, second, second + 1);
                    this.indices.push(first, second + 1, first + 1);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    display() {
        super.display();
    }
}