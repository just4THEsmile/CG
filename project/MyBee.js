import {CGFobject} from '../lib/CGF.js';
import {MyHead} from "./Objects/MyHead.js";
import {MyEye} from "./Objects/MyEye.js";
import {MyLeg} from "./Objects/MyLeg.js";
import {MyWing} from "./Objects/MyWing.js";
import {MyAntenna} from "./Objects/MyAntenna.js";
import {MyAbdomen} from "./Objects/MyAbdomen.js";

export class MyBee extends CGFobject {

    constructor(scene,x,y,z){
        
        super(scene);
        
        this.x = x;
        this.y = y;
        this.z = z;

        this.head = new MyHead(scene);
        this.leftEye = new MyEye(scene);
        this.rightEye = new MyEye(scene);
        this.abdomen = new MyAbdomen(scene);
        this.leftAntenna = new MyAntenna(scene);
        this.rightAntenna = new MyAntenna(scene);
        this.frontLeftLeg = new MyLeg(scene);
        this.frontRightLeg = new MyLeg(scene);
        this.backLeftLeg = new MyLeg(scene);
        this.backRightLeg = new MyLeg(scene);
        this.frontLeftWing = new MyWing(scene);
        this.frontRightWing = new MyWing(scene);
        this.backLeftWing = new MyWing(scene);
        this.backRightWing = new MyWing(scene);
    }



    update(t){
        
        let deltaTime = t - this.time;
        this.time = t;

        this.y = 3 + Math.sin(2*Math.PI * t / 1000);

        this.wingAngle = Math.sin(2*Math.PI * t / 500) * 20; 
    }

    display(){

        //Start Display Bee
        this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.z);
        
        //Display Head
        this.scene.pushMatrix();
        this.scene.translate(0,0,0);
        this.head.display();
        this.scene.popMatrix();

        //Display Left Eye
        this.scene.pushMatrix();
        this.scene.translate(0.55,0.6,0.55);
        this.scene.rotate(-50 * (Math.PI / 180),1,0,0);
        this.leftEye.display();
        this.scene.popMatrix();

        // Display Right Eye
        this.scene.pushMatrix();
        this.scene.translate(-0.55, 0.6, 0.55); 
        this.scene.rotate(-50 * (Math.PI / 180), 1, 0, 0); 
        this.rightEye.display();
        this.scene.popMatrix();
        
        //Display Abdomen
        this.scene.pushMatrix();
        this.scene.translate(0,-0.2,-2);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.abdomen.display();
        this.scene.popMatrix();
        
        //Display leftAntenna
        this.scene.pushMatrix();
        this.scene.translate(-0.1,0.5,0.5);
        this.scene.rotate(-20 * (Math.PI / 180),0,1,0);
        this.leftAntenna.display();
        this.scene.popMatrix();

        // Display rightAntenna
        this.scene.pushMatrix();
        this.scene.translate(0.1, 0.5, 0.5); 
        this.scene.rotate(20 * (Math.PI / 180), 0, 1, 0); 
        this.rightAntenna.display();
        this.scene.popMatrix();
        
        //Display Front Left Leg
        this.scene.pushMatrix();
        this.scene.translate(0.8,0,-1);
        this.scene.rotate(-40 * (Math.PI / 180),0,0,1);
        this.frontLeftLeg.display();
        this.scene.popMatrix();

        //Display Front Right Leg
        this.scene.pushMatrix();
        this.scene.translate(-0.8,0,-1);
        this.scene.scale(-1, 1, 1);
        this.scene.rotate(-40 * (Math.PI / 180),0,0,1);
        this.frontRightLeg.display();
        this.scene.popMatrix();

        //Display Back Left Leg
        this.scene.pushMatrix();
        this.scene.translate(0.8,0,-3);
        this.scene.rotate(-40 * (Math.PI / 180),0,0,1);
        this.backLeftLeg.display();
        this.scene.popMatrix(); 

        //Display Back Right Leg
        this.scene.pushMatrix();
        this.scene.translate(-0.8,0,-3);
        this.scene.scale(-1, 1, 1);
        this.scene.rotate(-40 * (Math.PI / 180),0,0,1);
        this.backRightLeg.display();
        this.scene.popMatrix();
        
        
        
        //Display Front Left Wing
        this.scene.pushMatrix();
        this.scene.translate(1.3,0.9,-2);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.rotate(this.wingAngle * (Math.PI / 180),0,0,1);
        this.scene.rotate(40 * (Math.PI / 180),0,0,1);
        this.scene.rotate(-40 * (Math.PI / 180),0,1,0);
        this.frontLeftWing.display();
        this.scene.popMatrix();

        //Display Front Right Wing
        this.scene.pushMatrix();
        this.scene.translate(-1.3,0.9,-2);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.rotate(-this.wingAngle * (Math.PI / 180),0,0,1);
        this.scene.rotate(-40 * (Math.PI / 180),0,0,1);
        this.scene.rotate(40 * (Math.PI / 180),0,1,0);
        this.frontRightWing.display();
        this.scene.popMatrix();

        //Display Back Left Wing
        this.scene.pushMatrix();
        this.scene.translate(1.4,0.8,-2.2);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.rotate(this.wingAngle * (Math.PI / 180),0,0,1);
        this.scene.rotate(40 * (Math.PI / 180),0,0,1);
        this.scene.rotate(-40 * (Math.PI / 180),0,1,0);
        this.scene.scale(1.2,1.5,1.2);
        this.backLeftWing.display();
        this.scene.popMatrix();

        //Display Back Right Wing
        this.scene.pushMatrix();
        this.scene.translate(-1.4,0.8,-2.2);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.rotate(-this.wingAngle * (Math.PI / 180),0,0,1);
        this.scene.rotate(-40 * (Math.PI / 180),0,0,1);
        this.scene.rotate(40 * (Math.PI / 180),0,1,0);
        this.scene.scale(1.2,1.5,1.2);
        this.backRightWing.display();
        this.scene.popMatrix();

        //End Display Bee
        this.scene.rotate(Math.PI,0,1,0);
        

    }


}