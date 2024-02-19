import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        
        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        //Diamond Checkbox
        this.gui.add(this.scene, 'displayDiamond').name('MyDiamond');

        //Triangle checkbox
        this.gui.add(this.scene, 'displayTriangle').name('MyTriangle');   

        //Parallelogram checkbox
        this.gui.add(this.scene, 'displayParallelogram').name('MyParallelogram');

        //TriangleBig checkbox
        this.gui.add(this.scene, 'displayTriangleBig').name('MyTriangleBig');

        //TriangleSmall checkbox
        this.gui.add(this.scene, 'displayTriangleSmall').name('MyTriangleSmall');
        
        return true;
    }
}