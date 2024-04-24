import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MySphere } from '../Geometric/MySphere.js';

export class MyEye extends CGFobject {

    constructor(scene){
        super(scene);

        this.eye = new MySphere(scene, 32, 32, false);
        
        this.initMaterials();

    }

    initMaterials(){
        this.eyeMaterial = new CGFappearance(this.scene);
        this.eyeMaterial.setAmbient(0.9, 0.9, 0.9, 1);
        this.eyeMaterial.setDiffuse(0.1, 0.1, 0.1, 1);
        this.eyeMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.eyeMaterial.setShininess(10.0);
    }

    display(){
        this.scene.pushMatrix();
        this.eyeMaterial.apply();
        this.scene.appearance_bee_eye.apply();
        this.scene.scale(0.3,0.6,0.4);
        this.scene.rotate(-10 * (Math.PI / 180),1,0,0);
        this.scene.rotate(90 * (Math.PI / 180),0,1,0);
        this.eye.display();
        this.scene.popMatrix();
    }

}