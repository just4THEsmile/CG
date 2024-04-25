import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyCone } from '../Geometric/MyCone.js';

export class MySting extends CGFobject {

    constructor(scene){
        super(scene);

        this.sting = new MyCone(scene, 32, 32, false);

        this.initMaterials();

    }

    initMaterials(){
        this.stingMaterial = new CGFappearance(this.scene);
        this.stingMaterial.setAmbient(0, 0, 0, 1); 
        this.stingMaterial.setDiffuse(0, 0, 0, 1); 
        this.stingMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.stingMaterial.setShininess(10.0);
    }

    display(){

        this.scene.pushMatrix();
        this.stingMaterial.apply();
        this.scene.scale(0.25, 0.50, 0.25);
        this.sting.display();
        this.scene.popMatrix();

    }

}