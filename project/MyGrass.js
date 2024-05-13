import {CGFobject,CGFappearance,CGFshader} from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';

export class MyGrass extends CGFobject{
    constructor(scene, size,heigth) {

        super(scene);
        this.size = size;
        this.heigth = heigth;
        this.triangle= new MyTriangle(this.scene, this.size);

        this.rand_inc_y =Math.random()*Math.PI-Math.PI/2;

        this.rand_inc_x = Math.random()*Math.PI/4-Math.PI/8;
        this.initBuffers();
    }

    initBuffers() {
        this.scene.appearance_stem.setAmbient(0.0,0.5,0.0, 1);
        this.scene.appearance_stem.setDiffuse(0.0,0.5,0.0, 1);
        this.scene.appearance_stem.setSpecular(0.0,0.5,0.0, 1);
        this.scene.appearance_stem.setShininess(10.0);

    }
    display() {
        let x = 0;
        let y = 0;
        let z = 0;


        let rad_x= 0;
        let rad_y= 0;
        for (let i = 0; i < this.heigth; i++) {
            rad_x += this.rand_inc_x;
            console.log("cooords");
            console.log(x,y,z);

            this.scene.pushMatrix();
            this.scene.appearance_stem.apply();
            this.scene.translate(x , y, z);
            this.scene.rotate(this.rand_inc_y, 0, 1, 0);
            this.scene.rotate(rad_x, 1, 0, 0);
            this.scene.translate(Math.sqrt(2)*0.3*this.size*this.size*1/2, 1*Math.sqrt(2)*this.size*this.size*1/2, 0);
            this.scene.rotate(Math.PI, 0, 0, -1);
            this.scene.scale(0.21*this.size, 0.7*this.size, 1*this.size);
            this.triangle.display();
            this.scene.popMatrix();   
            
            this.scene.pushMatrix();
            this.scene.appearance_stem.apply();
            this.scene.translate(x , y, z);
            this.scene.rotate(this.rand_inc_y, 0, 1, 0);
            this.scene.rotate(rad_x, 1, 0, 0);
            this.scene.translate(-Math.sqrt(2)*0.3*this.size*this.size*1/2, 1*Math.sqrt(2)*this.size*this.size*1/2, 0);

            this.scene.scale(0.21*this.size, 0.7*this.size, 1*this.size);
            this.scene.rotate(Math.PI*2/4, 0, 0, -1);
            this.triangle.display();
            this.scene.popMatrix();   

            this.scene.pushMatrix();
            this.scene.appearance_stem.apply();
            this.scene.translate(x , y, z);
            this.scene.rotate(this.rand_inc_y, 0, 1, 0);
            this.scene.rotate(rad_x, 1, 0, 0);
            this.scene.scale(0.3*this.size, 1*this.size, 1*this.size);
            this.scene.rotate(Math.PI*3/4, 0, 0, -1);
            this.triangle.display();
            this.scene.popMatrix();

            y += 1*Math.sqrt(2)*this.size*this.size*1*Math.cos(rad_x);
            x += 1*Math.sqrt(2)*this.size*this.size*1*Math.sin(rad_x)*Math.sin(this.rand_inc_y);

            z += 1*Math.sqrt(2)*this.size*this.size*1*Math.sin(rad_x)*Math.cos(this.rand_inc_y);

        }
        this.scene.pushMatrix();
        this.scene.appearance_stem.apply();
        this.scene.translate(x , y, z);
        this.scene.rotate(this.rand_inc_y, 0, 1, 0);
        this.scene.rotate(rad_x, 1, 0, 0);
        this.scene.scale(0.3*this.size, 1*this.size, 1*this.size);
        this.scene.rotate(Math.PI*3/4, 0, 0, -1);
        this.triangle.display();
        this.scene.popMatrix();
    }

    update(t) {
        t /= 1000;
        this.rand_inc_x = Math.PI/16 * Math.sin(t);

    }
}