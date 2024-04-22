import {CGFobject,CGFappearance} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyReceptacle extends CGFobject {

    constructor(scene, hearth_radius, color_heart,stem_size,x,y,z) {

        super(scene);
        this.hearth_radius = hearth_radius;
        this.color_heart = color_heart;
        this.sphere = new MySphere(this.scene, 10, 10);
        this.x = x;
        this.y = y;
        this.z = z;
        this.initBuffers();
        


    }

    initBuffers() {
        this.receptacle_appearance = new CGFappearance(this.scene);
        this.receptacle_appearance.setAmbient(this.color_heart[0], this.color_heart[1], this.color_heart[2], 1.0);
        this.receptacle_appearance.setDiffuse(this.color_heart[0], this.color_heart[1], this.color_heart[2], 1.0);
        this.receptacle_appearance.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.receptacle_appearance.setShininess(10.0);
    }
    display() {
        this.scene.pushMatrix();
        
        this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(this.hearth_radius, this.hearth_radius, this.hearth_radius);
        this.receptacle_appearance.apply();
        this.sphere.display();
        this.scene.popMatrix();
        
    }

}