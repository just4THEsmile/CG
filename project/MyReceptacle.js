import {CGFobject,CGFappearance} from '../lib/CGF.js';
import { MySphere } from './Geometric/MySphere.js';

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
    }
    display() {
        this.scene.main_shader.setUniformsValues({color_of_text: this.color_heart});
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(this.hearth_radius, this.hearth_radius, this.hearth_radius);
        this.scene.appearance_receptacle.apply();
        this.sphere.display();
        this.scene.popMatrix();
        
    }

}