import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MySphere } from "./Geometric/MySphere.js";

export class MyPollen extends MySphere {
    constructor(scene, radius, slices, stacks) {
        super(scene, radius, slices, stacks);
        
        this.initMaterials();
        
    }

    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(1, 0.647, 0, 1); 
        this.material.setDiffuse(1, 0.647, 0, 1); 
        this.material.setSpecular(0.5, 0.5, 0.5, 1);
        this.material.setShininess(10.0);
    }

    display() {
  
        
        this.scene.pushMatrix();
        this.scene.appearance_pollen.apply();
        this.scene.scale(1.2, 1, 1.2);
        super.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.appearance_pollen.apply();

        this.scene.translate(0, 0.5, 0);
        this.scene.scale(1.19, 1.4, 1.19); 
        super.display();
        this.scene.popMatrix();
    
    }
}