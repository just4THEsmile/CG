import { CGFobject } from "../lib/CGF.js";
import { MyRock } from "./MyRock.js";

export class MyRockPyramid extends CGFobject {

    constructor(scene, heigth, slices, stacks){

        super(scene);
        this.rocks = [];

        let rockId = 0;

        for(let h = 0; h < heigth; h++){

            let numRocks = (h + 1) * (h + 1);

            for(let i = 0; i < numRocks; i++){

                let rock = new MyRock(scene,slices,stacks);

                let x = ((i % (h + 1)) - h / 2);
                let y = -h*1.2;
                let z = Math.floor((i / (h + 1)) - h / 2);

                rock.position = [x,y,z];
                this.rocks[rockId++] = rock;

            }
        }

    }

    display(){
        console.log("num rocks: " + this.rocks.length);
        for(let rock of this.rocks){
            this.scene.pushMatrix();
            this.scene.translate(rock.position[0],rock.position[1],rock.position[2]);
            rock.display();
            this.scene.popMatrix();
        }
    }

}
