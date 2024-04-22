import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyTriangle } from './MyTriangle.js';

export class MyLeaf extends CGFobject {
    constructor(scene, slices, stacks, radius, height, triangleSize,color_stem,color_leaf) {
        super(scene);
        console.log("Leaf");
        console.log(radius);
        this.cylinder = new MyCylinder(this.scene, slices, stacks, radius,height);
        this.triangle1 = new MyTriangle(this.scene, triangleSize);
        this.triangle2 = new MyTriangle(this.scene, triangleSize);
        this.height = height;
        this.color_stem = color_stem;
        this.color_leaf = color_leaf;
        this.rotationAngle = 50.0 * Math.PI / 180.0; // Convert to radians
        this.initMaterials();
    }
    initMaterials() {
        this.stemMaterial = new CGFappearance(this.scene);
        this.stemMaterial.setAmbient(this.color_stem[0], this.color_stem[1], this.color_stem[2], 1.0);
        this.stemMaterial.setDiffuse(this.color_stem[0], this.color_stem[1], this.color_stem[2], 1.0);
        this.stemMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.stemMaterial.setShininess(10.0);

        this.leafMaterial = new CGFappearance(this.scene);
        this.leafMaterial.setAmbient(this.color_leaf[0], this.color_leaf[1], this.color_leaf[2], 1.0);
        this.leafMaterial.setDiffuse(this.color_leaf[0], this.color_leaf[1], this.color_leaf[2], 1.0);
        this.leafMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.leafMaterial.setShininess(10.0);
    }

    display() {
        
        // Draw the cylinder
        this.scene.pushMatrix();
        this.stemMaterial.apply();
        this.scene.rotate(this.rotationAngle, 1, 0, 0);	
        this.cylinder.display();
        this.scene.popMatrix();

        // Draw the first triangle
        this.scene.pushMatrix();
        this.leafMaterial.apply();
        
        this.scene.rotate(this.rotationAngle, 1, 0, 0);
        this.scene.translate(0, this.height, 0);
        this.scene.rotate(Math.PI*0.1, 0, 1, 0);
        this.scene.rotate(Math.PI*0.25, 0, 0, -1);
        this.scene.rotate(Math.PI*1, 0, 0, 1);
        

        this.triangle1.display();
        this.scene.popMatrix();

        // Draw the second triangle
        this.scene.pushMatrix();
        this.leafMaterial.apply();
        this.scene.rotate(this.rotationAngle, 1, 0, 0);
        this.scene.translate(0, this.height, 0);
        this.scene.rotate(Math.PI*0.1, 0, -1, 0);
        this.scene.rotate(Math.PI*0.25, 0, 0, -1);

        this.triangle2.display();
        this.scene.popMatrix();
    }
}