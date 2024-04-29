import { CGFappearance, CGFobject, CGFshader } from '../lib/CGF.js';
import { MySphere } from "./Geometric/MySphere.js";

export class MyPollen extends MySphere {
    constructor(scene, slices, stacks, x, y, z) {
        super(scene, slices, stacks);

        this.x = x;
        this.y = y;
        this.z = z;
        
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

        this.scene.main_shader.setUniformsValues({color_of_text: [1, 0.5, 0]})

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);

        this.scene.pushMatrix();
        this.scene.appearance_pollen.apply();
        this.scene.scale(1.2, 1, 1.2);
        super.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.appearance_pollen.apply();
        this.scene.translate(0, 0.5, 0);
        this.scene.scale(1.2, 1.4, 1.2);
        super.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}