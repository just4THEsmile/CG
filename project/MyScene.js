import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyRock } from "./MyRock.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyRockPyramid } from "./MyRockPyramid.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.sphere = new MySphere(this, 32, 32, false);
    this.panorama = new MyPanorama(this, new CGFtexture(this, "images/city_panorama.jpg"));
    this.rock = new MyRock(this, 32, 32, false);
    this.rockset = new MyRockSet(this, 5, 32, 32);
    this.rockpyramid = new MyRockPyramid(this, 3, 32, 32);

    //Objects connected to MyInterface
    this.displayAxis = false;
    this.displayNormals = false;
    this.displaySphere = false;
    this.displayPlane = false;
    this.displayPanorama = false;
    this.displayRock = false;
    this.displayRockSet = false;
    this.displayRockPyramid = true;
    this.scaleFactor = 1;

    //Textures
    this.enableTextures(true);
    this.texture_terrain = new CGFtexture(this, "images/terrain.jpg");
    this.texture_earth = new CGFtexture(this, "images/earth.jpg");

    //Appearances
    this.appearance_earth = new CGFappearance(this);
    this.appearance_earth.setTexture(this.texture_earth);
    this.appearance_earth.setTextureWrap('REPEAT', 'REPEAT');

    this.appearance_terrain = new CGFappearance(this);
    this.appearance_terrain.setTexture(this.texture_terrain);
    this.appearance_terrain.setTextureWrap('REPEAT', 'REPEAT');

  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();
    // ---- BEGIN Primitive drawing section

    if (this.displaySphere) { 

      this.pushMatrix();
      this.appearance_earth.apply();
      this.sphere.display();
      this.popMatrix();

      if(this.displayNormals) this.sphere.enableNormalViz();

    }

    if (this.displayPanorama) {
      this.panorama.display();
      this.camera.fov = 0.7;
    }
    else{
      this.camera.fov = 1.0;
    }

    if (this.displayPlane) {

      this.pushMatrix();
      this.appearance_terrain.apply();
      this.translate(0,-100,0);
      this.scale(400,400,400);
      this.rotate(-Math.PI/2.0,1,0,0);
      this.plane.display();
      this.popMatrix();

      if(this.displayNormals) this.plane.enableNormalViz();

    }

    if(this.displayRock){

      this.rock.display();
      if(this.displayNormals) this.rock.enableNormalViz();

    }


    if(this.displayRockSet){

      this.rockset.display();
      if(this.displayNormals){
        for(let child of this.rockset.rocks){
          child.enableNormalViz();
        }
      }
    }

    if(!this.displayNormals){
      this.sphere.disableNormalViz();
      this.plane.disableNormalViz();
      this.rock.disableNormalViz();
      for(let child of this.rockset.rocks){
        child.disableNormalViz();
      }
    }

    if(this.displayRockPyramid){
        this.rockpyramid.display();
        if(this.displayNormals){
          for(let child of this.rockpyramid.rocks){
            child.enableNormalViz();
          }
        }
      }  
  }
}
