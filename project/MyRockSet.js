import { CGFobject } from "../lib/CGF.js";
import { MyRock } from "./MyRock.js";

export class MyRockSet extends CGFobject {

    constructor(scene,numRocks,slices,stacks){

        super(scene);
        this.rocks = [];

        for(let i = 0; i < numRocks; i++){

            let rock = new MyRock(scene, slices, stacks);


            let x = Math.random() * 20 - 10;
            let y = 0;
            let z = Math.random() * 20 - 10;

            rock.position = [x,y,z];
            this.rocks.push(rock);
        }

    }

    display() {
        for(let rock of this.rocks){
            this.scene.pushMatrix();
            this.scene.translate(rock.position[0],rock.position[1],rock.position[2]);
            this.scene.scale(rock.scale[0],rock.scale[1],rock.scale[2]);
            rock.display();
            this.scene.popMatrix();
        }
    }
}