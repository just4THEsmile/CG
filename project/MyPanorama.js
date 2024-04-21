import {CGFobject, CGFappearance} from '../lib/CGF.js';
import {MySphere} from './Geometric/MySphere.js';

export class MyPanorama extends CGFobject {

    constructor(scene,texture) {

        super(scene);

        this.texture = texture;
        this.sphere = new MySphere(scene, 50, 50, true);

        this.material = new CGFappearance(scene);
        this.material.setEmission(1, 1, 1, 1);
        this.material.setTexture(this.texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

    }

    display() {

        this.scene.pushMatrix();

        let cameraPosition = this.scene.camera.position;
        this.scene.translate(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
        
        this.scene.scale(200,200,200);
        this.material.apply();
        this.sphere.display();
        this.scene.popMatrix();

    }

}