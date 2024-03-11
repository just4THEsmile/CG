import {CGFobject, CGFappearance} from '../lib/CGF.js';
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
        this.triangleSmall1 = new MyTriangleSmall(scene,[0.25, 0.75, 0.5, 0.5, 0.75, 0.75, 0.25, 0.75, 0.5, 0.5, 0.75, 0.75]);
        this.triangleSmall2 = new MyTriangleSmall(scene,[0,0,0.25,0.25,0.5,0,0,0,0.25,0.25,0.5,0]);
        this.triangleBig2 = new MyTriangleBig(scene, [0, 0, 1, 0, 0.5, 0.5, 0, 0, 1, 0, 0.5, 0.5]);
        this.triangleBig1 = new MyTriangleBig(scene, [1, 0, 1, 1, 0.5, 0.5, 1, 0, 1, 1, 0.5, 0.5]);
        this.initMaterials();
	}

    initMaterials(){

        this.orangeMaterial = new CGFappearance(this.scene);
        this.orangeMaterial.setAmbient(1, 0.6, 0, 1.0);
        this.orangeMaterial.setDiffuse(1, 0.6, 0, 1.0);
        this.orangeMaterial.setSpecular(1, 0.6, 0, 1.0);
        this.orangeMaterial.setShininess(10.0);

        this.blueMaterial = new CGFappearance(this.scene);
        this.blueMaterial.setAmbient(0, 0, 1, 1.0);
        this.blueMaterial.setDiffuse(0, 0, 1, 1.0);
        this.blueMaterial.setSpecular(0, 0, 1, 1.0);
        this.blueMaterial.setShininess(10.0);

        this.greenMaterial = new CGFappearance(this.scene);
        this.greenMaterial.setAmbient(0, 1, 0, 1.0);
        this.greenMaterial.setDiffuse(0, 1, 0, 1.0);
        this.greenMaterial.setSpecular(0, 1, 0, 1.0);
        this.greenMaterial.setShininess(10.0);

        this.yellowMaterial = new CGFappearance(this.scene);
        this.yellowMaterial.setAmbient(1, 1, 0, 1.0);
        this.yellowMaterial.setDiffuse(1, 1, 0, 1.0);
        this.yellowMaterial.setSpecular(1, 1, 0, 1.0);
        this.yellowMaterial.setShininess(10.0);

        this.pinkMaterial = new CGFappearance(this.scene);
        this.pinkMaterial.setAmbient(1, 0.6, 0.8, 1.0);
        this.pinkMaterial.setDiffuse(1, 0.6, 0.8, 1.0);
        this.pinkMaterial.setSpecular(1, 0.6, 0.8, 1.0);
        this.pinkMaterial.setShininess(10.0);

        this.redMaterial = new CGFappearance(this.scene);
        this.redMaterial.setAmbient(1, 0, 0, 1.0);
        this.redMaterial.setDiffuse(1, 0, 0, 1.0);
        this.redMaterial.setSpecular(1, 0, 0, 1.0);
        this.redMaterial.setShininess(10.0);

        this.purpleMaterial = new CGFappearance(this.scene);
        this.purpleMaterial.setAmbient(0.5, 0, 0.5, 1.0);
        this.purpleMaterial.setDiffuse(0.5, 0, 0.5, 1.0);
        this.purpleMaterial.setSpecular(0.5, 0, 0.5, 1.0);
        this.purpleMaterial.setShininess(10.0);

        this.newtexture = new CGFappearance(this.scene);
        this.newtexture.loadTexture('images/tangram.png');

    }

    display(){

        this.newtexture.apply();


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
        //this.orangeMaterial.apply();
        this.triangleBig1.display();
        this.scene.popMatrix();

        //Blue Triangle
        this.scene.pushMatrix();
        this.scene.translate(-1.4, 0, 0);
        //this.blueMaterial.apply();
        this.triangleBig2.display();
        this.scene.popMatrix();

        //Green Square
        this.scene.pushMatrix();
        this.scene.translate(0.6,1,0);
        //this.greenMaterial.apply();
        //this.scene.customMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();

        //Yellow Parallelogram
        this.scene.pushMatrix();
        this.scene.scale(-1, 1, 1);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.translate(1,-0.4,0);
        //this.yellowMaterial.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        //Pink Triangle
        this.scene.pushMatrix();
        this.scene.translate(1.6, 3, 0);
        //this.pinkMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

        //Red Triangle
        this.scene.pushMatrix();
        this.scene.translate(-2.4, -3.4, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        //this.redMaterial.apply();
        this.triangleSmall1.display();
        this.scene.popMatrix();

        //Purple Triangle
        this.scene.pushMatrix();
        this.scene.translate(-2.1, -4.7, 0);
        this.scene.rotate(135 * Math.PI / 180, 0, 0, 1);
        //this.purpleMaterial.apply();
        this.triangleSmall2.display();
        this.scene.popMatrix();


    }

    enableNormalViz(){
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangleSmall.enableNormalViz();
        this.triangleBig.enableNormalViz();
    }

    disableNormalViz(){
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangleSmall.disableNormalViz();
        this.triangleBig.disableNormalViz();

    }
    updateBuffers(complexity){
    }
}