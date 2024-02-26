import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyTriangle } from './MyTriangle.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';


export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.diamond= new MyDiamond(scene);
        this.triangle= new MyTriangle(scene);
        this.triangleBig = new MyTriangleBig(scene);
        this.triangleSmall = new MyTriangleSmall(scene);
        this.parallelogram = new MyParallelogram(scene);
    }
    display()  {

        let transMatrix= [1, 0, 0, 0,
                      0, 1, 0, 0,
                      0, 0, 1, 0,
                      -1.38, -1.38, 0, 1];

        //Orange triangle
        this.scene.pushMatrix()
        this.scene.multMatrix(transMatrix)
        this.scene.rotate(45 * Math.PI / 180, 0, 0, 1)
        this.scene.setDiffuse(255 / 255, 165 / 255, 0 / 255, 0)
        this.triangleBig.display()
        this.scene.popMatrix()

        //Blue Triangle

        this.scene.pushMatrix()
        this.scene.translate(-1.4, 0, 0)
        this.scene.setDiffuse(0 / 255, 0 / 255, 255 / 255, 0)
        this.triangleBig.display()
        this.scene.popMatrix()

        // green diamond
        this.scene.pushMatrix()
        this.scene.setDiffuse(0 / 255, 255 / 255, 0 / 255, 0)
        this.scene.translate(0.6, 1, 0)
        this.diamond.display()
        this.scene.popMatrix()

        // yellow parallelogram

        this.scene.pushMatrix()
        this.scene.setDiffuse(255 / 255, 255 / 0, 0 / 255, 0)
        this.scene.scale(-1, 1, 1)
        this.scene.rotate(90 * Math.PI / 180, 0, 0, 1)
        this.scene.translate(1, -0.4, 0)
        this.parallelogram.display()
        this.scene.popMatrix()

        // purple triangle
        this.scene.pushMatrix()
        this.scene.setDiffuse(255 / 255, 192 / 255, 203 / 255, 0)
        this.scene.translate(1.6, 3, 0)
        this.scene.rotate(0* Math.PI / 180, 0, 0, 1)
        this.triangle.display()
        this.scene.popMatrix()

        // red triangle
        this.scene.pushMatrix()
        this.scene.setDiffuse(255 / 255, 0 / 255, 0 / 255, 0)
        this.scene.translate(-2.4, -3.4, 0)
        this.scene.rotate(90* Math.PI / 180, 0, 0, 1)
        this.triangleSmall.display()
        this.scene.popMatrix()

        // pink triangle
        this.scene.pushMatrix()
        this.scene.setDiffuse(128 / 255, 0 / 255, 128 / 255, 0)
        this.scene.translate(-2, -4.8, 0)
        this.scene.rotate(135* Math.PI / 180, 0, 0, 1)
        this.triangleSmall.display()
        this.scene.popMatrix()
    }

        
}



