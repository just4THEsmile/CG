import {CGFobject,CGFappearance,CGFshader} from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';

export class MyPetal extends CGFobject {

    constructor(scene, heart_radius, external_radius, color_petals, angle,axis_angle, stem_size,x,y,z) {
        super(scene);
        this.external_radius = external_radius;
        this.heart_radius = heart_radius;
        this.petal_size =  external_radius-heart_radius;
        this.axis_angle = axis_angle;
        this.triangle= new MyTriangle(this.scene, this.petal_size);
        this.color_petals = color_petals;
        this.angle = angle;
        this.x = x;
        this.y = y;
        this.z = z;

        this.angle = angle;

        
        this.initBuffers();

    }

    initBuffers() {
        this.scene.appearance_petal.setAmbient(this.color_petals[0],this.color_petals[1],this.color_petals[2], 1);
        this.scene.appearance_petal.setDiffuse(this.color_petals[0],this.color_petals[1],this.color_petals[2], 1);
        this.scene.appearance_petal.setSpecular(this.color_petals[0],this.color_petals[1],this.color_petals[2], 1);
        this.scene.appearance_petal.setShininess(10.0);

    }
    display(){
        this.scene.appearance_petal.apply();
        this.scene.pushMatrix();
        
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.axis_angle, 1, 0, 0);

        this.scene.rotate(this.angle, 0, -1, 0);
        
        this.scene.translate(this.heart_radius+this.petal_size,0,0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.rotate(Math.PI, 0, 1, 0);


        this.scene.scale(1,1,.3)
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.triangle.display();
        
        
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.axis_angle, 1, 0, 0);

        this.scene.rotate(this.angle, 0,-1 , 0);
        this.scene.translate(this.heart_radius+this.petal_size,0,0);
        
        this.scene.scale(1,1,.3)
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);  
        
        
        this.triangle.display();
        

        this.scene.popMatrix();
    }

}