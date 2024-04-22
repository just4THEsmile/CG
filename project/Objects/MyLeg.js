import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyCylinder } from '../Geometric/MyCylinder.js';
import { MySphere } from '../Geometric/MySphere.js';


export class MyLeg extends CGFobject {

    constructor(scene){
        
        super(scene);
        
        this.topleg = new MyCylinder(scene, 32, 32, 1, 0.05);
        this.ankle = new MySphere(scene, 32, 32, false);
        this.bottomleg = new MyCylinder(scene, 32, 32, 1, 0.05);

        this.initMaterials();
    }

    initMaterials(){
        this.toplegMaterial = new CGFappearance(this.scene);
        this.ankleMaterial = new CGFappearance(this.scene);
        this.bottomlegMaterial = new CGFappearance(this.scene);

    }

    display(){

        //Display Top Leg
        this.scene.pushMatrix();
        this.toplegMaterial.apply();
        this.scene.appearance_bee_leg.apply();
        this.scene.rotate(90 * (Math.PI / 180),0,1,0);
        this.topleg.display();
        this.scene.popMatrix();

        //Display Ankle
        this.scene.pushMatrix();
        this.ankleMaterial.apply();
        this.scene.appearance_bee_leg.apply();
        this.scene.rotate(90 * (Math.PI / 180),0,1,0);
        this.scene.translate(0,0,1);
        this.scene.scale(0.1,0.1,0.1);
        this.ankle.display();
        this.scene.popMatrix();

        //Display Bottom Leg
        this.scene.pushMatrix();
        this.bottomlegMaterial.apply();
        this.scene.appearance_bee_leg.apply();
        this.scene.rotate(90 * (Math.PI / 180),0,1,0);
        this.scene.translate(0,0,1);
        this.scene.rotate(45 * (Math.PI / 180),1,0,0);
        this.bottomleg.display();
        this.scene.popMatrix();
    }

}