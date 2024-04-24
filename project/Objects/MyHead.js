import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MySphere } from '../Geometric/MySphere.js';

export class MyHead extends CGFobject {

    constructor(scene){
        super(scene);

        this.head = new MySphere(scene, 32, 32, false);
        
        this.initMaterials();

    }

    initMaterials(){
        this.headMaterial = new CGFappearance(this.scene);
        this.headMaterial.setAmbient(175/255, 127/255, 31/255, 1); 
        this.headMaterial.setDiffuse(175/255, 127/255, 31/255, 1); 
        this.headMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.headMaterial.setShininess(10.0);
    }

    display(){
        this.scene.pushMatrix();
        this.headMaterial.apply();
        this.scene.rotate(-5 * (Math.PI / 180),1,0,0);
        this.scene.scale(0.8,1,0.6);
        this.head.display();
        this.scene.popMatrix();
    }

}