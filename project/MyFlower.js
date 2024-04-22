import {CGFobject} from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';

export class MyFlower extends CGFobject {

    constructor(scene, external_radius, num_petals, color_petals, hearth_radius, color_heart, stem_radius, stem_size, color_stem, color_leaves) {

        super(scene);

        this.rand_rot= []
        this.rand_stem = []
        this.rand_stem_rot_x = []
        this.rand_stem_rot_z= []
        this.rand_leaf_size = []
        for(let i = 0; i < stem_size; i++){
            this.rand_rot.push(Math.random()*Math.PI*2);
            this.rand_stem.push(Math.random() * 0.5 + 0.5);
            this.rand_stem_rot_x.push(Math.random()* Math.PI / 8 - Math.PI / 16);
            this.rand_stem_rot_z.push(Math.random()* Math.PI / 8 - Math.PI / 16);
            this.rand_leaf_size.push(Math.random() * 0.8 + 0.4);
        }

        this.stem = new MyStem(scene, stem_radius, color_stem,color_leaves,stem_size,this.rand_rot,this.rand_stem,this.rand_stem_rot_x,this.rand_stem_rot_z,this.rand_leaf_size);

        let z=0;
        let y = 0;
        let x = 0;
        let rad_x= 0;
        let rad_z= 0;
        for (let i = 0; i < stem_size; i++) {
            rad_z += this.rand_stem_rot_z[i];
            rad_x += this.rand_stem_rot_x[i];

            y += this.rand_stem[i]*Math.cos(rad_x)* Math.cos(rad_z);
            x -= this.rand_stem[i]*Math.sin(rad_x);
            z += this.rand_stem[i]*Math.sin(rad_z);
            console.log(x,y,z);
            if (i+1 == stem_size ) {
                y += hearth_radius*Math.cos(rad_x)* Math.cos(rad_z);
                x -= hearth_radius*Math.sin(rad_x);
                z += hearth_radius*Math.sin(rad_z);

            }
        }


        this.receptacle = new MyReceptacle(scene, hearth_radius, color_heart,stem_size,x,y,z);
        
        this.petals = [];
        var angle = 2 * Math.PI / num_petals;
        let start_angle= Math.random()*Math.PI;
        let axis_angle= Math.random()*Math.PI/2-Math.PI/4;
        for (let i = 0; i < num_petals; i++) {
            this.petals.push(new MyPetal(scene, hearth_radius,external_radius, color_petals,start_angle+angle*i,axis_angle,stem_size,x,y,z));
        }

        
        
        this.initBuffers();

    }

    initBuffers() {
        


    }
    display() {
        this.stem.display();
        this.receptacle.display();
        this.petals.forEach(petal => {
            petal.display();
        });
    }
}
