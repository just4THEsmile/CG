import {CGFobject} from '../lib/CGF.js';
import {MyHead} from "./Objects/MyHead.js";
import {MyEye} from "./Objects/MyEye.js";
import {MyLeg} from "./Objects/MyLeg.js";
import {MyWing} from "./Objects/MyWing.js";
import {MyAntenna} from "./Objects/MyAntenna.js";
import {MyAbdomen} from "./Objects/MyAbdomen.js";
import {MyTorax} from "./Objects/MyTorax.js";
import {MyPollen} from "./MyPollen.js";
import {MySting} from "./Objects/MySting.js";

export class MyBee extends CGFobject{

    constructor(scene,x,y,z,pollens,hive){
        
        super(scene);
        
        this.x = x;
        this.y = y;
        this.baseY = y;
        this.z = z;

        this.orientation = 0;

        this.velocity = [0,0,0];

        this.head = new MyHead(scene);
        this.eye = new MyEye(scene);
        this.torax = new MyTorax(scene);
        this.abdomen = new MyAbdomen(scene);
        this.antenna = new MyAntenna(scene);
        this.leg = new MyLeg(scene);
        this.sting = new MySting(scene);
        this.wing = new MyWing(scene);
        this.mandible = new MySting(scene);


        this.bee_AI = false;
        this.current_pollen = null;
        this.pollens = pollens;
        this.rotate_legs_pollen = 0;
        this.hive = hive;

        

    }

    intelligence(){

        this.bee_AI = !this.bee_AI;

        if(!this.bee_AI){
            console.log("Bee AI Deactivated")
            this.target = null;
            this.velocity = [0,0,0];
            return;
        }
        console.log("Bee AI Activated")
        this.initialPosition = { x: this.x, y: this.y, z: this.z };
        if(this.current_pollen == null){
            console.log("Bee AI Going to Pollen");
            this.target = this.findNearestPollen();
        }
        else{
            console.log("Bee AI Going to Hive");
            this.target = this.hive;
        }

        console.log(this.target);
    }

    update(t){

        this.speedFactor = this.scene.speedFactor;
        this.scaleFactor = this.scene.scaleFactor;

        if (!this.lastUpdateTime) {
            this.lastUpdateTime = t;
        }
        
        let deltaTime = t - this.lastUpdateTime;

        this.x += this.velocity[0] * deltaTime;
        this.baseY += this.velocity[1] * deltaTime;
        this.z += this.velocity[2] * deltaTime;


        //Animation Bee Oscilation
        this.y = this.baseY + Math.sin(2*Math.PI * t / 1000);

        //Animation Bee Wing
        this.wingAngle = Math.sin(2*Math.PI * t / 500) * 25; 

        //Check if Bee is near the Pollen
        if(this.checkPollen()){
            this.rotate_legs_pollen = 20;
        }
        else{
            this.rotate_legs_pollen = 0;
        }

        //Check if Bee is near the Hive
        if(this.checkHive() && this.current_pollen != null){
            this.rotate_legs_pollen = 0;
        }
        else if(this.current_pollen != null){
            this.rotate_legs_pollen = 20;
        }

        //Bee AI
        if(this.bee_AI && this.target){
            this.moveTowards(this.target,t);
        }

        this.lastUpdateTime = t;
    }

    moveTowards(target,t){

        this.offset = 0;
        if(this.target == this.hive){
            this.offset = 25;
        }

        let dx = target.x - this.x;
        let dy = target.y - this.y + this.offset;
        let dz = target.z - this.z;
    
        let distance = Math.sqrt(dx*dx + dy*dy + dz*dz);

        // Calculate a factor based on distance for parabolic movement
        let a = 0.05;
        let factor = a * Math.pow(distance / 2, 2);  


        if (distance > 1) {
            this.velocity[0] = ((dx / distance)/100) * this.speedFactor;
            this.velocity[1] = (((dy + factor) / distance) / 100) * this.speedFactor;
            this.velocity[2] = ((dz / distance)/100) * this.speedFactor;

        } else {
            this.velocity[0] = 0;
            this.velocity[1] = 0;
            this.velocity[2] = 0;
            this.target = null;
            this.bee_AI = false;
        }

        //Bee Orientation
        let targetOrientation = Math.atan2(dx, dz);
        this.orientation = this.OrientationAngle(this.orientation, targetOrientation, 0.05);
    }

    OrientationAngle(a, b, t) {
        let delta = ((b - a + Math.PI) % (2 * Math.PI)) - Math.PI;
        return a + delta * t;
    }

    findNearestPollen(){

        let nearestPollen = null;
        let nearestDistance = Infinity;

        for(let i = 0; i < this.pollens.length; i++){
            let dx = this.pollens[i].x - this.x;
            let dy = this.pollens[i].y - this.y;
            let dz = this.pollens[i].z - this.z;

            let distance = Math.sqrt(dx*dx + dy*dy + dz*dz);

            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestPollen = this.pollens[i];
            }
        }

        return nearestPollen;
    }

    checkHive() {
        let dx = this.hive.x - this.x;
        let dy = this.hive.y - this.y + 20;
        let dz = this.hive.z - this.z;
    
        let distance = Math.sqrt(dx*dx + dy*dy + dz*dz);

        if (distance < 8 && this.current_pollen != null) {
            console.log("Reached Hive");
            this.hive.pollens.push(this.current_pollen);
            this.current_pollen = null;
        }
    }
    
    checkPollen(){

        if(this.current_pollen != null){
            return true;
        }

        for(let i = 0; i < this.pollens.length; i++){
            let dx = this.pollens[i].x - this.x;
            let dy = this.pollens[i].y - this.y;
            let dz = this.pollens[i].z - this.z;

            let distance = Math.sqrt(dx*dx + dy*dy + dz*dz);

    
            if (distance < 3) {
                this.current_pollen = this.pollens[i];
                console.log("Pollen Found");
                console.log(this.current_pollen);
                this.pollens.splice(i,1);

                
                return false;
            }
        }

    }

    turn(v){
        this.orientation += v * this.speedFactor;

        let speed = Math.sqrt(this.velocity[0]*this.velocity[0] + this.velocity[1]*this.velocity[1] + this.velocity[2]*this.velocity[2]);

        this.velocity[0] = speed * Math.sin(this.orientation);
        this.velocity[2] = speed * Math.cos(this.orientation);
    }

    accelerate(v){

        let speed = Math.sqrt(this.velocity[0]**2 + this.velocity[1]**2 + this.velocity[2]**2);
        speed += v * this.speedFactor;

        if (speed < 0) {
            speed = 0;
        }

        this.velocity[0] = speed * Math.sin(this.orientation);
        this.velocity[2] = speed * Math.cos(this.orientation);

    }

    moveY(v){
        this.baseY += v * this.speedFactor;

    }

    reset(){
        this.x = 0;
        this.y = 0;
        this.baseY = 0;
        this.z = 0;
        this.orientation = 0;
        this.velocity = [0, 0, 0];


    }

    display(){
        
        //Start Display Bee
        this.scene.pushMatrix();
        this.scene.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
        this.scene.translate(this.x,this.y,this.z);
        this.scene.rotate(this.orientation,0,1,0);

        //Display Head
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.3);
        this.head.display();
        this.scene.popMatrix();

        //Display Left Eye
        this.scene.pushMatrix();
        this.scene.translate(0.45,0.0,0.5);
        this.eye.display();
        this.scene.popMatrix();

        // Display Right Eye
        this.scene.pushMatrix();        
        this.scene.translate(-0.45, 0.0, 0.5);
        this.eye.display();
        this.scene.popMatrix();

        //Display Torax
        this.scene.pushMatrix();
        this.scene.translate(0,0.2,-1);
        this.torax.display();
        this.scene.popMatrix();

        
        //Display Abdomen
        this.scene.pushMatrix();
        this.scene.translate(0,-1.1,-3.4);
        this.scene.rotate(-30*(Math.PI/180),1,0,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.abdomen.display();
        this.scene.popMatrix();
        
        //Display leftAntenna
        this.scene.pushMatrix();
        this.scene.translate(-0.1,0.5,0.5);
        this.scene.rotate(-20 * (Math.PI / 180),0,1,0);
        this.antenna.display();
        this.scene.popMatrix();

        // Display rightAntenna
        this.scene.pushMatrix();
        this.scene.translate(0.1, 0.5, 0.5); 
        this.scene.rotate(20 * (Math.PI / 180), 0, 1, 0); 
        this.antenna.display();
        this.scene.popMatrix();
        

        //Display Front Left Leg
        this.scene.pushMatrix();
        this.scene.translate(0.55,0,-0.6);
        this.scene.rotate(-40 * (Math.PI/180), 0, 1, 0);
        this.scene.rotate((-40 - this.rotate_legs_pollen ) * (Math.PI / 180),0,0,1);
        this.leg.display();
        this.scene.popMatrix();

        //Display Front Right Leg
        this.scene.pushMatrix();
        this.scene.translate(-0.55,0,-0.6);
        this.scene.rotate(220 * (Math.PI/180), 0, 1, 0);
        this.scene.rotate((-40 - this.rotate_legs_pollen ) * (Math.PI / 180),0,0,1);
        this.leg.display();
        this.scene.popMatrix();

        //Display Back Left Leg
        this.scene.pushMatrix();
        this.scene.translate(0.55,0,-1.3);
        this.scene.rotate(40 * (Math.PI/180), 0, 1, 0);
        this.scene.rotate((-40 - this.rotate_legs_pollen ) * (Math.PI / 180),0,0,1);
        this.leg.display();
        this.scene.popMatrix(); 

        //Display Back Right Leg
        this.scene.pushMatrix();
        this.scene.translate(-0.55,0,-1.3);
        this.scene.rotate(140 * (Math.PI/180), 0, 1, 0);
        this.scene.rotate((-40 - this.rotate_legs_pollen ) *  (Math.PI / 180),0,0,1);
        this.leg.display();
        this.scene.popMatrix();

        //Display Sting
        this.scene.pushMatrix();
        this.scene.translate(0,-2,-5);
        this.scene.rotate(-130*(Math.PI/180),1,0,0);
        this.sting.display();
        this.scene.popMatrix();

        //Display Right Mandible
        this.scene.pushMatrix();
        this.scene.translate(0.2,-0.85,0.5);
        this.scene.rotate(160*(Math.PI/180),1,0,0);
        this.scene.scale(0.5,0.5,0.5);
        this.mandible.display();
        this.scene.popMatrix();
        
        //Display Left Mandible
        this.scene.pushMatrix();
        this.scene.translate(-0.2,-0.85,0.5);
        this.scene.rotate(160*(Math.PI/180),1,0,0);
        this.scene.scale(0.5,0.5,0.5);
        this.mandible.display();
        this.scene.popMatrix();
        

        //Check if carrying a pollen
        if(this.current_pollen != null){
            this.scene.setActiveShader(this.scene.main_shader);
            this.scene.main_shader.setUniformsValues({color_of_text: [1, 0.5, 0]});
            this.new_pollen = new MyPollen(this.scene, 32, 32, 0, 0, 0);

            this.scene.pushMatrix();
            this.scene.translate(0,-2.8,-1.5);
            this.scene.rotate(-30*(Math.PI/180),1,0,0);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.new_pollen.display();
            this.scene.popMatrix();
            this.scene.setActiveShader(this.scene.defaultShader);
        }

        //Display Front Left Wing
        this.scene.pushMatrix();
        this.scene.translate(0.80,0.3,-1);
        this.scene.rotate(this.wingAngle * (Math.PI / 180),0,0,1);
        this.scene.translate(0.40,0.5,-0.30);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.rotate(40 * (Math.PI / 180),0,0,1);
        this.scene.rotate(-40 * (Math.PI / 180),0,1,0);
        this.scene.scale(0.8,1,100);
        this.wing.display();
        this.scene.popMatrix();
        
        //Display Front Right Wing
        this.scene.pushMatrix();
        this.scene.translate(-0.80,0.3,-1);
        this.scene.rotate(-this.wingAngle * (Math.PI / 180),0,0,1);
        this.scene.translate(-0.40,0.6,-0.30);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.rotate(-40 * (Math.PI / 180),0,0,1);
        this.scene.rotate(40 * (Math.PI / 180),0,1,0);
        this.scene.scale(0.8,1,0.3);
        this.wing.display();
        this.scene.popMatrix();
        
        //Display Back Left Wing
        this.scene.pushMatrix();
        this.scene.translate(0.80,0.2,-1.2);
        this.scene.rotate(this.wingAngle * (Math.PI / 180),0,0,1);
        this.scene.translate(0.55,0.6,-0.30);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.rotate(40 * (Math.PI / 180),0,0,1);
        this.scene.rotate(-40 * (Math.PI / 180),0,1,0);
        this.scene.scale(1.2,1.5,1.2);
        this.wing.display();
        this.scene.popMatrix();
        
        //Display Back Right Wing
        this.scene.pushMatrix();
        this.scene.translate(-0.80,0.2,-1.2);
        this.scene.rotate(-this.wingAngle * (Math.PI / 180),0,0,1);
        this.scene.translate(-0.55,0.6,-0.30);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.rotate(-40 * (Math.PI / 180),0,0,1);
        this.scene.rotate(40 * (Math.PI / 180),0,1,0);
        this.scene.scale(1.2,1.5,1.2);
        this.wing.display();
        this.scene.popMatrix();

        //End Display Bee
        
        this.scene.popMatrix();

    }

    getPosition() {
        return { x: this.x, y: this.y, z: this.z };
    }

    getOrientation() {
        return this.orientation;
    }


}