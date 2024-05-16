import { MyFlower } from "./MyFlower";
import {CGFobject} from '../lib/CGF.js';

export class MyGarden extends CGFobject {

    constructor(scene, size) {
        super(scene);
        this.size = size;
        this.flower_list = []
        for(let i = 0; i < this.size*this.size; i++){
            let rand_petal_color = [Math.random(), Math.random(), Math.random()]
            let rand_receptacle_color = [Math.random(), Math.random(), Math.random()]
            let rand_leaf_color = [Math.random(), Math.random(), Math.random()]
            let rand_stem_color = [Math.random(), Math.random(), Math.random()]
            let rand_external_radius = Math.random()*0.5+0.5;
            let rand_petal_num = Math.floor(Math.random()*5)+5;
            let rand_receptacle_radius = Math.random()*0.3+0.3;
            let stem_radius = Math.random()*0.05+0.05;
            let stem_size = Math.floor(Math.random()*5)+5;




            this.flower_list.push(new MyFlower(this,i%size,i/size,0, rand_external_radius, rand_petal_num, rand_petal_color, rand_receptacle_radius, rand_receptacle_color, stem_radius, stem_size, rand_stem_color, rand_leaf_color))
        }
    }

    display(){
        for(let i = 0; i < this.size*this.size; i++){
            this.scene.pushMatrix();
            this.flower_list[i].display();
            this.scene.popMatrix(); 
        }
    }

    get_flowers(){
        return this.flower_list;
    }
}
