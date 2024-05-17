import {CGFobject,CGFappearance} from '../../lib/CGF.js';
import { MySphere } from '../Geometric/MySphere.js';

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
        this.appearance_receptacle = new CGFappearance(this.scene);
        this.appearance_receptacle.setTexture(this.scene.texture_receptacle);
        this.appearance_receptacle.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance_receptacle.setAmbient(this.color_heart[0],this.color_heart[1],this.color_heart[2], 1);
        this.appearance_receptacle.setDiffuse(this.color_heart[0],this.color_heart[1],this.color_heart[2], 1);
        this.appearance_receptacle.setSpecular(this.color_heart[0],this.color_heart[1],this.color_heart[2], 1);
        this.appearance_receptacle.setShininess(10.0);

    }
    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(this.hearth_radius, this.hearth_radius, this.hearth_radius);
        this.appearance_receptacle.apply();
        this.sphere.display();
        this.scene.popMatrix();
        
    }

}