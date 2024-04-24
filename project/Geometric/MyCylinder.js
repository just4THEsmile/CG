import { CGFobject } from '../../lib/CGF.js';


export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks, height, radius) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.height = height;
        this.radius = radius;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        const angle = 2 * Math.PI / this.slices;
    
        // Cylinder body
        for (let stack = 0; stack <= this.stacks; stack++) {
            const z = this.height * (stack / this.stacks);
    
            for (let slice = 0; slice <= this.slices; slice++) {
                const x = this.radius * Math.cos(slice * angle);
                const y = this.radius * Math.sin(slice * angle);
    
                this.vertices.push(x, y, z);
                this.normals.push(x, y, 0);
                this.texCoords.push(slice / this.slices, stack / this.stacks);
            }
        }
    
        // Cylinder bottom
        for (let slice = 0; slice <= this.slices; slice++) {
            const x = this.radius * Math.cos(slice * angle);
            const y = this.radius * Math.sin(slice * angle);
    
            this.vertices.push(x, y, 0);
            this.normals.push(0, 0, -1);
            this.texCoords.push(0.5 + 0.5 * Math.cos(slice * angle), 0.5 + 0.5 * Math.sin(slice * angle));
        }
    
        // Cylinder top
        for (let slice = 0; slice <= this.slices; slice++) {
            const x = this.radius * Math.cos(slice * angle);
            const y = this.radius * Math.sin(slice * angle);
    
            this.vertices.push(x, y, this.height);
            this.normals.push(0, 0, 1);
            this.texCoords.push(0.5 + 0.5 * Math.cos(slice * angle), 0.5 + 0.5 * Math.sin(slice * angle));
        }
    
        // Indices for the cylinder body
        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                const first = (stack * (this.slices + 1)) + slice;
                const second = first + this.slices + 1;
    
                this.indices.push(first, second + 1, second);
                this.indices.push(first, first + 1, second + 1);
            }
        }
    
        // Indices for the cylinder bottom
        const startBottom = (this.stacks + 1) * (this.slices + 1);
        for (let slice = 0; slice < this.slices; slice++) {
            this.indices.push(startBottom, startBottom + slice + 2, startBottom + slice + 1);
        }

        // Indices for the cylinder top
        const startTop = startBottom + this.slices + 1;
        for (let slice = 0; slice < this.slices; slice++) {
            this.indices.push(startTop, startTop + slice + 1, startTop + slice + 2);
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

}