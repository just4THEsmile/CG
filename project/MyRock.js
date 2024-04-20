import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';

export class MyRock extends CGFobject {

    constructor(scene, slices, stacks, inverse = false) {

        super(scene);
        
        this.slices = slices;
        this.stacks = stacks;
        this.inverse = inverse;

        let scaleX = Math.random() * 0.5 + 0.5;
        let scaleY = Math.random() * 0.5 + 0.5;
        let scaleZ = Math.random() * 0.5 + 0.5;

        this.scale = [scaleX, scaleY, scaleZ];

        this.material = new CGFappearance(scene);
        this.material.setAmbient(0.5, 0.5, 0.5, 1.0); 
        this.material.setDiffuse(0.5, 0.5, 0.5, 1.0); 
        this.material.setSpecular(0.5, 0.5, 0.5, 1.0); 
        this.material.setShininess(10.0); 

        this.texture = new CGFtexture(scene, "images/rock_texture.jpg");
        this.material.setTexture(this.texture);

        this.initBuffers();
    
    }

    initBuffers() {

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for(let stack = 0; stack <= this.stacks; stack++) {

            let theta = stack * Math.PI / this.stacks;
            let sinTheta = Math.sin(theta);
            let cosTheta = Math.cos(theta);

            let sameOffset = (Math.random() - 0.5) / 10;

            for(let slice = 0; slice <= this.slices; slice++) {
                    
                let angle = slice * 2 * Math.PI / this.slices;
                let sinAngle = Math.sin(angle);
                let cosAngle = Math.cos(angle);

                let x = cosAngle * sinTheta;
                let y = cosTheta;
                let z = sinAngle * sinTheta;

                if(slice === 0 || slice === this.slices) {
                    x += sameOffset;
                    y += sameOffset;
                    z += sameOffset;
                }
                else{
                    x += (Math.random() - 0.5) / 10;
                    y += (Math.random() - 0.5) / 10;
                    z += (Math.random() - 0.5) / 10;
                }



                let u = slice / this.slices;
                let v = stack / this.stacks;
                let new_u = 1 - u;

                this.vertices.push(x, y, z);
                this.normals.push(this.inverse ? -x : x, this.inverse ? -y : y, this.inverse ? -z : z);
                this.texCoords.push(new_u, v);

            } 
        }

        for(let stack = 0; stack < this.stacks; stack++) {

            for(let slice = 0; slice < this.slices; slice++) {

                let first = (stack * (this.slices + 1)) + slice;
                let second = first + this.slices + 1;

                if(this.inverse) {

                    this.indices.push(first, second, first + 1);
                    this.indices.push(second, second + 1, first + 1);

                } 
                else {

                    this.indices.push(first + 1, second, first);
                    this.indices.push(first + 1, second + 1, second);
                   
                }
                
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();

    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(this.scale[0],this.scale[1],this.scale[2]);
        this.material.apply();
        super.display();
        this.scene.popMatrix();
    }
}