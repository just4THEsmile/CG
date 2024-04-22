import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyCylinder } from '../Geometric/MyCylinder.js';
import { MySphere } from '../Geometric/MySphere.js';

export class MyAntenna extends CGFobject {

    constructor(scene){

        super(scene);

        this.antennaScape = new MyCylinder(scene, 32, 32, 1, 0.05)
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
        this.antennaScape.display();
        this.scene.popMatrix();

        //Display Antenna Scape
        this.scene.pushMatrix();
        this.antennaFlagellumMaterial.apply();
        this.scene.appearance_bee_antennae.apply();
        this.scene.rotate(-45 * (Math.PI / 180),1,0,0);
        this.scene.translate(0,0,1);
        this.scene.scale(0.1,0.1,0.1);
        this.antennaFlagellum.display();
        this.scene.popMatrix();
    }

}