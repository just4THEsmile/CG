import {CGFobject} from '../lib/CGF.js';
import { MyPetal } from './Objects/MyPetal.js';
import { MyReceptacle } from './Objects/MyReceptacle.js';
import { MyStem } from './Objects/MyStem.js';
import { MyPollen } from './MyPollen.js';

export class MyFlower extends CGFobject {

    constructor(scene,x_pos,y_pos,z_pos, external_radius, num_petals, color_petals, hearth_radius, color_heart, stem_radius, stem_size, color_stem, color_leaves) {

        super(scene);

        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.z_pos = z_pos;

        this.rand_rot= []
        this.rand_stem = []
        this.rand_stem_rot_x = []
        this.rand_stem_rot_z= []
        this.rand_leaf_size = []
        for(let i = 0; i < stem_size; i++){
            this.rand_rot.push(Math.random()*Math.PI*2);
            this.rand_stem.push(Math.random() * 0.5 + 0.5);
            this.rand_stem_rot_x.push(Math.random()* Math.PI / 16 - Math.PI / 32);
            this.rand_stem_rot_z.push(Math.random()* Math.PI / 16 - Math.PI / 32);
            this.rand_leaf_size.push(Math.random() * 0.8 + 0.4);
        }

        this.stem = new MyStem(scene, stem_radius, color_stem,color_leaves,stem_size,this.rand_rot,this.rand_stem,this.rand_stem_rot_x,this.rand_stem_rot_z,this.rand_leaf_size);

        this.z = 0;
        this.y = 0;
        this.x = 0;
        let rad_x= 0;
        let rad_z= 0;
        for (let i = 0; i < stem_size; i++) {
            rad_z += this.rand_stem_rot_z[i];
            rad_x += this.rand_stem_rot_x[i];

            this.y += this.rand_stem[i]*Math.cos(rad_x)* Math.cos(rad_z);
            this.x -= this.rand_stem[i]*Math.sin(rad_x);
            this.z += this.rand_stem[i]*Math.sin(rad_z);
            if (i+1 == stem_size ) {
                this.y += hearth_radius*Math.cos(rad_x)* Math.cos(rad_z);
                this.x -= hearth_radius*Math.sin(rad_x);
                this.z += hearth_radius*Math.sin(rad_z);

            }
        }


        this.receptacle = new MyReceptacle(scene, hearth_radius, color_heart,stem_size,this.x,this.y,this.z);
        
        this.petals = [];
        var angle = 2 * Math.PI / num_petals;
        let start_angle= Math.random()*Math.PI;
        let axis_angle= Math.random()*Math.PI/2-Math.PI/4;
        for (let i = 0; i < num_petals; i++) {
            this.petals.push(new MyPetal(scene, hearth_radius,external_radius, color_petals,start_angle+angle*i,axis_angle,stem_size,this.x,this.y,this.z));
        }

        
        this.initBuffers();

    }

    initBuffers() {
        


    }
    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.x_pos, this.y_pos, this.z_pos);
        this.stem.display();
        this.receptacle.display();
        this.petals.forEach(petal => {
            petal.display();
        });
        this.scene.popMatrix();
    }
}
