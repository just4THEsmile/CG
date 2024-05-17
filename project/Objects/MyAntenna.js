import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyCylinder2 } from '../Geometric/MyCylinder2.js';
import { MySphere } from '../Geometric/MySphere.js';

export class MyAntenna extends CGFobject {

    constructor(scene){

        super(scene);

        this.antennaScape = new MyCylinder2(scene, 32, 32, 1, 0.05);
        this.antennaFlagellum = new MySphere(scene, 32, 32, false);


        this.initMaterials();
    }

    initMaterials(){
        this.antennaScapeMaterial = new CGFappearance(this.scene);
        this.antennaFlagellumMaterial = new CGFappearance(this.scene);

    }

    display(){

        //Display Antenna Flagellum
        this.scene.pushMatrix();
        this.antennaScapeMaterial.apply();
        this.scene.appearance_bee_antennae.apply();
        this.scene.rotate(-45 * (Math.PI / 180),1,0,0);
        this.scene.scale(0.7,0.7,0.7);
        this.antennaScape.display();
        this.scene.popMatrix();

        //Display Antenna Scape
        this.scene.pushMatrix();
        this.antennaFlagellumMaterial.apply();
        this.scene.appearance_bee_antennae.apply();
        this.scene.rotate(-45 * (Math.PI / 180),1,0,0);
        this.scene.translate(0,0,0.7);
        this.scene.scale(0.1,0.1,0.1);
        this.antennaFlagellum.display();
        this.scene.popMatrix();

        //Display Antenna End
        this.scene.pushMatrix();
        this.antennaScapeMaterial.apply();
        this.scene.appearance_bee_antennae.apply();
        this.scene.rotate(-45 * (Math.PI / 180),1,0,0);
        this.scene.translate(0,0,0.7);
        this.scene.rotate(30 * (Math.PI / 180),1,0,0);
        this.antennaScape.display();
        this.scene.popMatrix();

        //Display Antenna End
        this.scene.pushMatrix();
        this.antennaFlagellumMaterial.apply();
        this.scene.appearance_bee_antennae.apply();
        this.scene.rotate(-45 * (Math.PI / 180),1,0,0);
        this.scene.translate(0,-0.5,1.6);
        this.scene.scale(0.1,0.1,0.1);
        this.antennaFlagellum.display();
        this.scene.popMatrix();




    }

}