import {CGFobject,CGFappearance,CGFshader} from '../lib/CGF.js';
import { MyGrass } from './MyGrass.js';


export class MyGardenOfGrass extends CGFobject{
    constructor(scene, size) {
            
            super(scene);
            this.size = size;
            this.grass_list = []
            for(let i = 0; i < this.size*this.size; i++){
              let size= Math.random()*0.2+0.2;
              let length = Math.random()*3+3;
              this.grass_list.push(new MyGrass(scene, size,length));
            }
            
    }
    display(){
        for(let i = 0; i < this.size*this.size; i++){
            
            this.scene.pushMatrix();
            this.scene.translate(i%this.size/2, 0, Math.floor(i/this.size)/2);
            this.grass_list[i].display();
            this.scene.popMatrix(); 
        }
    }
    update(t){
        for(let i = 0; i < this.size*this.size; i++){
            this.grass_list[i].update(t);
        }
    }

}