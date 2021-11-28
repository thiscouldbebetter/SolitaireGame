"use strict";
class Globals {
    initialize(viewSizeInPixels, universe) {
        this.display = new Display();
        this.display.initialize(viewSizeInPixels);
        this.universe = universe;
        this.universe.initialize();
        this.inputHelper = new InputHelper();
        this.inputHelper.initialize();
        this.update();
    }
    update() {
        this.universe.update();
    }
}
Globals.Instance = new Globals();
