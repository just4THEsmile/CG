import {CGFobject,CGFappearance} from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';

export class MyPetal extends CGFobject {

    constructor(scene, heart_radius, external_radius, color_petals, angle,axis_angle, stem_size,x,y,z) {
        super(scene);
        this.external_radius = external_radius;
        this.heart_radius = heart_radius;
        this.petal_size =  external_radius-heart_radius;
        this.axis_angle = axis_angle;
        this.triangle1= new MyTriangle(this.scene, this.petal_size);
        this.triangle2= new MyTriangle(this.scene, this.petal_size);
        this.color_petals = color_petals;
        this.angle = angle;
        this.x = x;
        this.y = y;
        this.z = z;

        this.angle = angle;

        
        this.initBuffers();

    }

    initBuffers() {
        this.petal_appearance = new CGFappearance(this.scene);
        this.petal_appearance.setAmbient(this.color_petals[0], this.color_petals[1], this.color_petals[2], 1.0);
        this.petal_appearance.setDiffuse(this.color_petals[0], this.color_petals[1], this.color_petals[2], 1.0);
        this.petal_appearance.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.petal_appearance.setShininess(10.0);
        

    }
    display(){
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
        this.petal_appearance.apply();
        this.triangle2.display();
        
        
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.axis_angle, 1, 0, 0);

        this.scene.rotate(this.angle, 0,-1 , 0);
        this.scene.translate(this.heart_radius+this.petal_size,0,0);
        
        this.scene.scale(1,1,.3)
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        
        this.petal_appearance.apply();
        this.triangle1.display();
        

        this.scene.popMatrix();
    }

}