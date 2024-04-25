import { CGFobject, CGFappearance } from '../../lib/CGF.js';

export class MyWing extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();

        this.initMaterials();
    }

    initMaterials(){
        this.wingMaterial = new CGFappearance(this.scene);
        this.wingMaterial.setAmbient(1.0, 1.0, 1.0, 0.1); 
        this.wingMaterial.setDiffuse(1.0, 1.0, 1.0, 0.2);
        this.wingMaterial.setSpecular(1.0, 1.0, 1.0, 0.3);
        this.wingMaterial.setEmission(1.0, 1.0, 1.0, 0.1);
        this.wingMaterial.setShininess(10.0);
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
    
        let slices = 32; 
        let a = 1; 
        let b = 0.5; 
    
        for(let i = 0; i < slices; i++) {
            let theta = i * 2.0 * Math.PI / slices;
            let nextTheta = (i + 1) * 2.0 * Math.PI / slices;
    
            this.vertices.push(0, 0, 0);
            this.vertices.push(a * Math.cos(theta), b * Math.sin(theta), 0);
            this.vertices.push(a * Math.cos(nextTheta), b * Math.sin(nextTheta), 0);
    
            let start = i * 6;
            this.indices.push(start, start + 1, start + 2);
    
            this.vertices.push(0, 0, 0);
            this.vertices.push(a * Math.cos(nextTheta), b * Math.sin(nextTheta), 0);
            this.vertices.push(a * Math.cos(theta), b * Math.sin(theta), 0);
    
            this.indices.push(start + 3, start + 4, start + 5);
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display(){

        this.scene.pushMatrix();
        this.wingMaterial.apply();
        super.display();
        this.scene.popMatrix();

        
    }
}