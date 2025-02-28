import { CGFappearance, CGFobject, CGFshader } from '../lib/CGF.js';
import { MyCube } from "./Geometric/MyCube.js";
import {MyPollen} from "./MyPollen.js";

export class MyHive extends CGFobject{
    constructor(scene, x, y, z) {
        super(scene);
        
        this.x = x;
        this.y = y;
        this.z = z;
        
        this.wall = new MyCube(scene);


        this.pollens = [];



        this.initMaterials();
        
    }

    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.45, 0.25, 0.15, 1); 
        this.material.setDiffuse(0.45, 0.25, 0.15, 1); 
        this.material.setSpecular(0.5, 0.5, 0.5, 1); 
        this.material.setShininess(1.0);

    }

    display() {
        //Start Display Hive
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        
        //Bottom
        this.scene.pushMatrix();
        this.scene.appearance_wood.apply();
        this.scene.scale(15,1,10);
        this.wall.display();
        this.scene.popMatrix();

        //Front
        this.scene.pushMatrix();
        this.scene.appearance_wood.apply();
        this.scene.translate(0,10,9);
        this.scene.scale(15,9,1);
        this.wall.display();
        this.scene.popMatrix();

        //Back
        this.scene.pushMatrix();
        this.scene.appearance_wood.apply();
        this.scene.translate(0,10,-9);
        this.scene.scale(15,9,1);
        this.wall.display();
        this.scene.popMatrix();
        
        //Left
        this.scene.pushMatrix();
        this.scene.appearance_wood.apply();
        this.scene.translate(-14,10,0);
        this.scene.scale(1,9,8);
        this.wall.display();
        this.scene.popMatrix();

        //Right
        this.scene.pushMatrix();
        this.scene.appearance_wood.apply();
        this.scene.translate(14,10,0);
        this.scene.scale(1,9,8);
        this.wall.display();
        this.scene.popMatrix();

        //Frames & Handles
        for (let i = 0; i < 12; i++) {

            //Frames
            this.scene.pushMatrix();
            this.scene.appearance_beehive.apply();
            this.scene.translate(i*2 - 11, 10, 0); 
            this.scene.rotate(Math.PI/2, 0, 1, 0);
            this.scene.scale(9, 8, 0.30);
            this.wall.display();
            this.scene.popMatrix();

            //Handles
            this.scene.pushMatrix();
            this.scene.appearance_wood.apply();
            this.scene.translate(i*2 - 11, 18.5, 0); 
            this.scene.rotate(Math.PI/2, 0, 1, 0);
            this.scene.scale(8, 0.5, 0.35);
            this.wall.display();
            this.scene.popMatrix();

        }

        //Top
        this.scene.pushMatrix();
        this.scene.appearance_wood.apply();
        this.scene.translate(0,28.15,5.8);
        this.scene.rotate(60*Math.PI/180, 1, 0, 0);
        this.scene.scale(15,1,10);
        this.wall.display();
        this.scene.popMatrix();

        //Support #1
        this.scene.pushMatrix();
        this.scene.appearance_wood.apply();
        this.scene.translate(-14,-2.01,9);
        this.wall.display();
        this.scene.popMatrix();

        //Support #2
        this.scene.pushMatrix();
        this.scene.appearance_wood.apply();
        this.scene.translate(14,-2.01,9);
        this.wall.display();
        this.scene.popMatrix();

        //Support #3
        this.scene.pushMatrix();
        this.scene.appearance_wood.apply();
        this.scene.translate(-14,-2.01,-9);
        this.wall.display();
        this.scene.popMatrix();

        //Support #4
        this.scene.pushMatrix();
        this.scene.appearance_wood.apply();
        this.scene.translate(14,-2.01,-9);
        this.wall.display();
        this.scene.popMatrix();
        

        //Display Pollens
        for (let i = 0; i < this.pollens.length; i++) {
            this.new_pollen = new MyPollen(this.scene, 32, 32, 0, 0, 0);
            this.scene.pushMatrix();
            // Add an offset to the x and z coordinates
            let offset = i ; // Change this value to adjust the distance between the pollens
            this.scene.translate(offset, 20, 0);
            this.new_pollen.display();
            this.scene.popMatrix();
        }

        //End Display Hive
        this.scene.popMatrix();
    }
}