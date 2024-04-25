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
    }

    display() {
        this.scene.main_shader.setUniformsValues({color_of_text: this.color_stem});
        // Draw the cylinder
        this.scene.pushMatrix();
        this.scene.appearance_stem.apply();
        this.scene.rotate(this.rotationAngle, 1, 0, 0);	
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.main_shader.setUniformsValues({color_of_text: this.color_leaf});
        // Draw the first triangle
        this.scene.pushMatrix();
        this.scene.main_shader.setUniformsValues()
        this.scene.appearance_leaf.apply();
        
        this.scene.rotate(this.rotationAngle, 1, 0, 0);
        this.scene.translate(0, this.height, 0);
        this.scene.rotate(Math.PI*0.1, 0, 1, 0);
        this.scene.rotate(Math.PI*0.25, 0, 0, -1);
        this.scene.rotate(Math.PI*1, 0, 0, 1);
        

        this.triangle1.display();
        this.scene.popMatrix();

        // Draw the second triangle
        this.scene.pushMatrix();
        this.scene.appearance_leaf.apply();
        this.scene.rotate(this.rotationAngle, 1, 0, 0);
        this.scene.translate(0, this.height, 0);
        this.scene.rotate(Math.PI*0.1, 0, -1, 0);
        this.scene.rotate(Math.PI*0.25, 0, 0, -1);

        this.triangle2.display();
        this.scene.popMatrix();
    }
}