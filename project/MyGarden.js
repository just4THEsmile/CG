import { MyFlower } from "./MyFlower.js";
import {CGFobject} from '../lib/CGF.js';

export class MyGarden extends CGFobject {

    constructor(scene, size) {
        super(scene);
        this.size = size;
        this.flower_list = []
        var rand_petal_color;
        var rand_receptacle_color;
        var rand_leaf_color;
        var rand_stem_color;
        var rand_external_radius;
        var rand_petal_num;
        var rand_receptacle_radius;
        var stem_radius;
        var stem_size;


        for(let i = 0; i < this.size*this.size; i++){
            rand_petal_color = [Math.random(), Math.random(), Math.random()]
            rand_receptacle_color = [Math.random()/2 +0.4, Math.random()/2 +0.4, Math.random()/4+0.2]
            rand_leaf_color = [Math.random()/4, Math.random()/2, Math.random()/4]
            rand_stem_color = [Math.random()/4, Math.random()/2, Math.random()/4]
            rand_external_radius = Math.random()*0.3+0.9;
            rand_petal_num = Math.floor(Math.random()*5)+5;
            rand_receptacle_radius = Math.random()*0.1+0.3;
            stem_radius = Math.random()*0.05+0.05;
            stem_size = Math.floor(Math.random()*5)+5;




            this.flower_list.push(new MyFlower(this.scene,i%this.size*4,0,i/this.size*4, rand_external_radius, rand_petal_num, rand_petal_color, rand_receptacle_radius, rand_receptacle_color, stem_radius, stem_size, rand_stem_color, rand_leaf_color))
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
