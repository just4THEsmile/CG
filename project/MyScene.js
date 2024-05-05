import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./Geometric/MySphere.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyFlower } from "./MyFlower.js";
import { MyRock } from "./MyRock.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyRockPyramid } from "./MyRockPyramid.js";
import { MyBee } from "./MyBee.js";
import { MyPollen } from "./MyPollen.js"
import { MyHive } from "./MyHive.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
    this.lastOKeyTime = 0;
    this.lastFKeyTime = 0;
    this.lastPKeyTime = 0;
    this.OKeyDelay = 300;

    this.isMovingUp = false;
    this.isMovingDown = false;

  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Enable Update
    this.setUpdatePeriod(1000/60);

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);
    this.gl.frontFace(this.gl.CWW);


    //Initialize scene parameters
    this.speedFactor = 1; 
    this.scaleFactor = 1;

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.sphere = new MySphere(this, 32, 32, false);
    this.panorama = new MyPanorama(this, new CGFtexture(this, "images/city_panorama.jpg"));
    this.flower= [new MyFlower(this,-60,-41,-40, 1, 8, [1, 0, 0], 0.3, [1, 1, 0], 0.07, 5, [0, 1, 0], [1, 1, 0])];
    this.rock = new MyRock(this, 32, 32, false);
    this.rockset = new MyRockSet(this, 10, 32, 32);
    this.rockpyramid = new MyRockPyramid(this, 5, 32, 32);
    this.pollens = [];
    for(let flower of this.flower){
        let pollen_x = flower.x + flower.x_pos;
        let pollen_y = flower.y + flower.y_pos + 0.2;  
        let pollen_z = flower.z + flower.z_pos;
        this.pollens.push(new MyPollen(this, 32, 32, pollen_x, pollen_y, pollen_z));
    }
    this.hive = new MyHive(this, -20, -40, 40);
    this.bee = new MyBee(this, 0, 0, 0, this.pollens, this.hive);


    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayNormals = false;
    this.displaySphere = false;
    this.displayPlane = true;
    this.displayFlower = true;
    this.displayPanorama = true;
    this.displayRock = false;
    this.displayRockSet = true;
    this.displayRockPyramid = true;
    this.displayBee = true;
    this.displayPollen = true;
    this.displayHive = true;
    this.useBeeCamera = false;


    //Textures
    this.enableTextures(true);
    this.texture_terrain = new CGFtexture(this, "images/terrain.jpg");
    this.texture_earth = new CGFtexture(this, "images/earth.jpg");
    this.texture_rock = new CGFtexture(this, "images/rock_texture.jpg");
    this.texture_bee = new CGFtexture(this, "images/bee_texture.jpg");
    this.texture_bee_antennae = new CGFtexture(this, "images/bee_antennae.jpg");
    this.texture_bee_leg = new CGFtexture(this, "images/bee_leg.jpg");
    this.texture_bee_eye = new CGFtexture(this, "images/bee_eye.png");
    this.texture_pollen = new CGFtexture(this, "images/pollen.jpg");
    this.texture_wood = new CGFtexture(this, "images/wood.jpg");
    this.texture_beehive = new CGFtexture(this, "images/beehive.jpg");
    this.texture_stem = new CGFtexture(this, "images/stem.jpg");
    this.texture_petal = new CGFtexture(this, "images/petal.jpg");
    this.texture_leaf = new CGFtexture(this, "images/leaf.jpg");
    this.texture_receptacle = new CGFtexture(this, "images/receptacle.jpg");

    //Shaders
    this.main_shader = new CGFshader(this.gl, "shaders/texture1.vert", "shaders/gray.frag")
    
    this.texture_wing = new CGFtexture(this, "images/wing.jpg");


    //Appearances
    this.appearance_earth = new CGFappearance(this);
    this.appearance_earth.setTexture(this.texture_earth);
    this.appearance_earth.setTextureWrap('REPEAT', 'REPEAT');
  
    this.appearance_terrain = new CGFappearance(this);
    this.appearance_terrain.setTexture(this.texture_terrain);
    this.appearance_terrain.setTextureWrap('REPEAT', 'REPEAT');

    this.appearance_rock = new CGFappearance(this);
    this.appearance_rock.setTexture(this.texture_rock);
    this.appearance_rock.setTextureWrap('REPEAT', 'REPEAT');

    this.appearance_bee = new CGFappearance(this);
    this.appearance_bee.setTexture(this.texture_bee);
    this.appearance_bee.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    this.appearance_bee_antennae = new CGFappearance(this);
    this.appearance_bee_antennae.setTexture(this.texture_bee_antennae);
    this.appearance_bee_antennae.setTextureWrap('REPEAT', 'REAPEAT');

    this.appearance_bee_leg = new CGFappearance(this);
    this.appearance_bee_leg.setTexture(this.texture_bee_leg);
    this.appearance_bee_leg.setTextureWrap('REPEAT', 'REPEAT');

    this.appearance_bee_eye = new CGFappearance(this);
    this.appearance_bee_eye.setTexture(this.texture_bee_eye);
    this.appearance_bee_eye.setTextureWrap('REPEAT', 'REPEAT');

    this.appearance_pollen = new CGFappearance(this);
    this.appearance_pollen.setTexture(this.texture_pollen);
    this.appearance_pollen.setTextureWrap('REPEAT', 'REPEAT');

    this.appearance_wood = new CGFappearance(this);
    this.appearance_wood.setTexture(this.texture_wood);
    this.appearance_wood.setTextureWrap('REPEAT', 'REPEAT');

    this.appearance_beehive = new CGFappearance(this);
    this.appearance_beehive.setTexture(this.texture_beehive);
    this.appearance_beehive.setTextureWrap('REPEAT', 'REPEAT');

    this.appearance_stem = new CGFappearance(this);
    this.appearance_stem.setTexture(this.texture_stem);
    this.appearance_stem.setTextureWrap('REPEAT', 'REPEAT');

    this.appearance_petal = new CGFappearance(this);
    this.appearance_petal.setTexture(this.texture_petal);
    this.appearance_petal.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    this.appearance_leaf = new CGFappearance(this);
    this.appearance_leaf.setTexture(this.texture_leaf);
    this.appearance_leaf.setTextureWrap('REPEAT', 'REPEAT');

    this.appearance_receptacle = new CGFappearance(this);
    this.appearance_receptacle.setTexture(this.texture_receptacle);
    this.appearance_receptacle.setTextureWrap('REPEAT', 'REPEAT');

    this.appearance_wing = new CGFappearance(this);
    this.appearance_wing.setTexture(this.texture_wing);
    this.appearance_wing.setTextureWrap('REPEAT', 'REPEAT');
    this.appearance_wing.setAmbient(1.0, 1.0, 1.0, 0.1); 
    this.appearance_wing.setDiffuse(1.0, 1.0, 1.0, 0.2);
    this.appearance_wing.setSpecular(1.0, 1.0, 1.0, 0.3);
    this.appearance_wing.setEmission(1.0, 1.0, 1.0, 0.1);
    this.appearance_wing.setShininess(10.0);



  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
    this.lights[1].setPosition(16, 7, 10, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();
    this.lights[1].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
    this.beeCamera = new CGFcamera(
      0.4, 
      0.1, 
      500, 
      vec3.fromValues(0, 0, 0), 
      vec3.fromValues(0, 0, 0)
    );
    this.defaultCamera = this.camera;
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    
    
    if (this.useBeeCamera) {
      this.camera = this.beeCamera;
    } else {
      this.camera = this.defaultCamera;
    }
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
      this.translate(0,-42,0);
      this.scale(800,800,800);
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

    if(this.displayRockPyramid){
        this.rockpyramid.display();
        if(this.displayNormals){
          for(let child of this.rockpyramid.rocks){
            child.enableNormalViz();
          }
        }
    }  

    if(this.displayPollen){
      for(let polen of this.pollens){
        this.setActiveShader(this.main_shader);
        polen.display();
        this.setActiveShader(this.defaultShader);
      }
    }

    if(this.displayHive){
      this.hive.display();
    }
    if (this.displayFlower) { 
      this.setActiveShader(this.main_shader);
      for(let flower of this.flower){
        flower.display();
      }
      this.setActiveShader(this.defaultShader);
    } 
    if(this.displayBee){
      this.bee.display();
    }

    
    if(!this.displayNormals){
      this.sphere.disableNormalViz();
      this.plane.disableNormalViz();
      this.rock.disableNormalViz();
      for(let child of this.rockset.rocks){
        child.disableNormalViz();
      }
      for(let child of this.rockpyramid.rocks){
        child.disableNormalViz();
      }
    }


  this.setActiveShader(this.defaultShader);

  }
  update(t){

    this.bee.update(t);
    this.checkKeys();

    let beePosition = this.bee.getPosition();
    let beeOrientation = this.bee.getOrientation();
    
    let distanceBehind = 10;
    let distanceAbove = 5;
    
    this.beeCamera.setPosition(vec3.fromValues(
      beePosition.x - distanceBehind * Math.sin(beeOrientation),
      beePosition.y + distanceAbove,
      beePosition.z - distanceBehind * Math.cos(beeOrientation)
    ));

    this.beeCamera.setTarget(vec3.fromValues(
        beePosition.x + Math.sin(beeOrientation),
        beePosition.y,
        beePosition.z + Math.cos(beeOrientation)
    ));

    if(this.isMovingDown){
      this.bee.moveY(-0.25);
    }

    if(this.isMovingUp){
      this.bee.moveY(0.25);
    }


  }
  checkKeys(){
    var text="Key pressed: ";
    var keysPressed=false;

    if(this.gui.isKeyPressed("KeyW")){
      
      this.bee.accelerate(0.001);
      
      text+=" W ";
      keysPressed = true;
    }

    if(this.gui.isKeyPressed("KeyS")){
      
      this.bee.accelerate(-0.001);
      
      text+=" S ";
      keysPressed=true;
    }

    if(this.gui.isKeyPressed("KeyA")){
      
      this.bee.turn(0.1);
      
      text+=" A ";
      keysPressed=true;
    }

    if(this.gui.isKeyPressed("KeyD")){
      
      this.bee.turn(-0.1);
      
      text+=" D ";
      keysPressed=true;
    }

    if(this.gui.isKeyPressed("KeyR")){
      
      this.bee.reset();
      
      text+=" R ";
      keysPressed=true;
    }

    if(this.gui.isKeyPressed("KeyF")){

      let currentTime = Date.now();

      if (currentTime - this.lastFKeyTime > this.OKeyDelay) {
        
        this.isMovingDown = !this.isMovingDown;
        this.isMovingUp = false;
        
        text+=" F ";
        keysPressed=true;
      }

      this.lastFKeyTime = currentTime;
    }

    if(this.gui.isKeyPressed("KeyP")){

      let currentTime = Date.now();

      if (currentTime - this.lastPKeyTime > this.OKeyDelay) {

        this.isMovingUp = !this.isMovingUp;
        this.isMovingDown = false;

        text+=" P ";
        keysPressed=true;
      }

      this.lastPKeyTime = currentTime;
    }

    if(this.gui.isKeyPressed("KeyO")){
      
      let currentTime = Date.now();

      if (currentTime - this.lastOKeyTime > this.OKeyDelay) {
        this.bee.intelligence();

        text+=" O ";
        keysPressed=true;

        this.lastOKeyTime = currentTime;
      }
    
    }

    if(keysPressed){
      console.log(text);

    }

    // ---- END Primitive drawing section
  }
}
