import { CGFobject } from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
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
    
        // Initialize the vertex index
        let vertexIndex = 0;
    
        // Calculate the angle increment for each slice
        let angleIncrement = 2 * Math.PI / this.slices;
    
        // Loop over each slice
        for (let slice = 0 ; slice < this.slices ; slice++) {
    
            // Calculate the x and y coordinates for the current and next slice
            let x1 = Math.cos(slice * angleIncrement);
            let y1 = Math.sin(slice * angleIncrement);
            let x2 = Math.cos((slice + 1) * angleIncrement);
            let y2 = Math.sin((slice + 1) * angleIncrement);
            
            // Calculate the z increment for each stack
            let z = 1 / this.stacks;
    
            // Loop over each stack
            for (let stackIndex = 0 ; stackIndex < this.stacks ; stackIndex++) {
    
                // Calculate the x and y coordinates for the normal
                let x = Math.cos((slice + 0.5) * angleIncrement);
                let y = Math.sin((slice + 0.5) * angleIncrement);
    
                // Calculate the size of the normal
                let size = Math.sqrt(x * x + y * y);
    
                // Push the vertices for the current and next slice and stack
                this.vertices.push(x1, y1, z * stackIndex, x2, y2, z * stackIndex, x1, y1, z * (stackIndex + 1), x2, y2, z * (stackIndex + 1));
    
                // Push the indices for the current and next slice and stack
                this.indices.push(vertexIndex + 2, vertexIndex, vertexIndex + 1, vertexIndex + 1, vertexIndex + 3, vertexIndex + 2);
    
                // Push the normals for the current and next slice and stack
                this.normals.push(x / size, y / size, 0, x / size, y / size, 0, x / size, y / size, 0, x / size, y / size, 0);
    
                // Increment the vertex index
                vertexIndex += 4;
            }
        }
    
        // Set the primitive type to triangles
        this.primitiveType = this.scene.gl.TRIANGLES;
    
        // Initialize the WebGL buffers
        this.initGLBuffers();
    }

    updateBuffers(complexity){
    }
}