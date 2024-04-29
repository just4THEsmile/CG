import {CGFobject,CGFappearance} from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyLeaf } from './MyLeaf.js';
export class MyStem extends CGFobject {

    constructor(scene, stem_radius, color_stem, color_leaf, stem_size,rand_rot,rand_stem,rand_stem_rot_x,rand_stem_rot_z,rand_leaf_size) {
        super(scene);
        this.stem_radius = stem_radius;
        this.color_stem = color_stem;
        this.color_leaf = color_leaf;
        this.stem_size = stem_size;

        this.stem = new MyCylinder(this.scene, 10, 10, this.stem_radius,1);
        this.leaf= new MyLeaf(this.scene, 10, 10, 0.04,1,0.4,color_stem,color_leaf); 
        this.rand_rot= rand_rot
        this.rand_stem = rand_stem
        this.rand_stem_rot_x = rand_stem_rot_x
        this.rand_stem_rot_z= rand_stem_rot_z
        this.rand_leaf_size = rand_leaf_size


        this.initMaterials();
    }

    initMaterials() {
    }
    display() {
        let z=0;
        let y = 0;
        let x = 0;
        let rad_x= 0;
        let rad_z= 0;
        for (let i = 0; i < this.stem_size; i++) {
            rad_z += this.rand_stem_rot_z[i];
            rad_x += this.rand_stem_rot_x[i];
            this.scene.main_shader.setUniformsValues({color_of_text: this.color_stem});
            this.scene.pushMatrix();
            this.scene.translate(x, y, z);

            this.scene.rotate(rad_x, 0, 0, 1);
            this.scene.rotate(rad_z, 1, 0, 0);
            this.scene.scale(1, this.rand_stem[i], 1);
            this.scene.appearance_stem.apply();
            this.stem.display();
            this.scene.popMatrix();

            y += this.rand_stem[i]*Math.cos(rad_x)* Math.cos(rad_z);
            x -= this.rand_stem[i]*Math.sin(rad_x);
            z += this.rand_stem[i]*Math.sin(rad_z);
            if (i < this.stem_size - 1) {
                this.scene.pushMatrix();
                this.scene.translate(x, y , z);
                this.scene.appearance_stem.apply();
                this.leaf.scene.rotate(rad_x, 0, 0, 1);
                this.leaf.scene.rotate(rad_z, 1, 0, 0);
                this.scene.rotate(this.rand_rot[i],0,1,0);
                this.leaf.scene.rotate((this.rand_rot[i]-1),0,1,0);
                this.leaf.scene.scale(this.rand_leaf_size[i], this.rand_leaf_size[i], this.rand_leaf_size[i]);
                this.leaf.display();
                this.scene.popMatrix();
            }


            
        }
    }

}