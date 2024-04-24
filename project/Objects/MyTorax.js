import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MySphere } from '../Geometric/MySphere.js';

export class MyTorax extends CGFobject {

    constructor(scene){
        super(scene);

        this.abdomen = new MySphere(scene, 32, 32, false);

        this.initMaterials();

    }

    initMaterials(){
        this.toraxMaterial = new CGFappearance(this.scene);
        this.toraxMaterial.setAmbient(175/255, 127/255, 31/255, 1); 
        this.toraxMaterial.setDiffuse(175/255, 127/255, 31/255, 1); 
        this.toraxMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.toraxMaterial.setShininess(10.0);
    }

    display(){

        this.scene.pushMatrix();
        this.toraxMaterial.apply();
        this.scene.scale(0.8,0.8,0.8);
        this.abdomen.display();
        this.scene.popMatrix();

    }

}