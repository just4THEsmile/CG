import {CGFobject} from '../lib/CGF.js';
import {MyDiamond} from './MyDiamond.js';
import {MyParallelogram} from './MyParallelogram.js';
import {MyTriangleSmall} from './MyTriangleSmall.js';
import {MyTriangleBig} from './MyTriangleBig.js';
import {MyTriangle} from './MyTriangle.js';
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangleSmall = new MyTriangleSmall(scene);
        this.triangleBig = new MyTriangleBig(scene);
	}

    display(){
        //Orange Triangle
        this.scene.pushMatrix();
        let translationMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -1.4,-1.4,0,1
        ]
        this.scene.multMatrix(translationMatrix);

        let rotationMatrix = [
            Math.cos(Math.PI/4), Math.sin(Math.PI/4), 0, 0,
            -Math.sin(Math.PI/4), Math.cos(Math.PI/4), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]
        this.scene.multMatrix(rotationMatrix);
        
        this.scene.setDiffuse(255/255, 155/255, 0, 1);
        this.triangleBig.display();
        this.scene.popMatrix();

        //Blue Triangle
        this.scene.pushMatrix();
        this.scene.translate(-1.4, 0, 0);
        this.scene.setDiffuse(0, 155/255, 255/255, 1);
        this.triangleBig.display();
        this.scene.popMatrix();

        //Green Square
        this.scene.pushMatrix();
        this.scene.translate(0.6,1,0);
        this.scene.setDiffuse(0/255,255/255,0/255, 1);
        this.diamond.display();
        this.scene.popMatrix();

        //Yellow Parallelogram
        this.scene.pushMatrix();
        this.scene.scale(-1, 1, 1);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.translate(1,-0.4,0);
        this.scene.setDiffuse(255/255,255/255,0/255, 1);
        this.parallelogram.display();
        this.scene.popMatrix();

        //Pink Triangle
        this.scene.pushMatrix();
        this.scene.translate(1.6, 3, 0);
        this.scene.setDiffuse(255/255, 105/255, 180/255, 1);
        this.triangle.display();
        this.scene.popMatrix();

        //Red Triangle
        this.scene.pushMatrix();
        this.scene.translate(-2.4, -3.4, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.setDiffuse(255/255, 0, 0, 1);
        this.triangleSmall.display();
        this.scene.popMatrix();

        //Purple Triangle
        this.scene.pushMatrix();
        this.scene.translate(-2.1, -4.7, 0);
        this.scene.rotate(135 * Math.PI / 180, 0, 0, 1);
        this.scene.setDiffuse(155/255, 0, 255/255, 1);
        this.triangleSmall.display();
        this.scene.popMatrix();


    }
}