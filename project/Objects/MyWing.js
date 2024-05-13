import { CGFobject, CGFappearance } from '../../lib/CGF.js';

export class MyWing extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();

        this.initMaterials();
    }

    initMaterials(){
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.texCoords = [];
    
        let slices = 32; 
        let a = 1; 
        let b = 0.5; 
    
        for(let i = 0; i < slices; i++) {
            let theta = i * 2.0 * Math.PI / slices;
            let nextTheta = (i + 1) * 2.0 * Math.PI / slices;
    
            this.vertices.push(0, 0, 0);
            this.vertices.push(a * Math.cos(theta), b * Math.sin(theta), 0);
            this.vertices.push(a * Math.cos(nextTheta), b * Math.sin(nextTheta), 0);

            this.texCoords.push(0.5, 0.5);
            this.texCoords.push(0.5 + 0.5 * Math.cos(theta), 0.5 + 0.5 * Math.sin(theta));
            this.texCoords.push(0.5 + 0.5 * Math.cos(nextTheta), 0.5 + 0.5 * Math.sin(nextTheta));

    
            let start = i * 6;
            this.indices.push(start, start + 1, start + 2);
    
            this.vertices.push(0, 0, 0);
            this.vertices.push(a * Math.cos(nextTheta), b * Math.sin(nextTheta), 0);
            this.vertices.push(a * Math.cos(theta), b * Math.sin(theta), 0);

            this.texCoords.push(0.5, 0.5);
            this.texCoords.push(0.5 + 0.5 * Math.cos(nextTheta), 0.5 + 0.5 * Math.sin(nextTheta));
            this.texCoords.push(0.5 + 0.5 * Math.cos(theta), 0.5 + 0.5 * Math.sin(theta));

    
            this.indices.push(start + 3, start + 4, start + 5);
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display(){

        this.scene.pushMatrix();
        this.scene.appearance_wing.apply();
        super.display();
        this.scene.popMatrix();

        
    }
}