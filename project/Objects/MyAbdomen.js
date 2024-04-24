import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MySphere } from '../Geometric/MySphere.js';

export class MyAbdomen extends CGFobject {

    constructor(scene){
        super(scene);

        this.abdomen = new MySphere(scene, 32, 32, false);

        this.initMaterials();

    }

    initMaterials(){
        this.abdomenMaterial = new CGFappearance(this.scene);
    
    }

    display(){

        this.scene.pushMatrix();
        this.abdomenMaterial.apply();
        this.scene.appearance_bee.apply();
        this.scene.scale(1,2,1);
        this.abdomen.display();
        this.scene.popMatrix();

    }

}