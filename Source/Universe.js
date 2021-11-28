"use strict";
class Universe {
    constructor(gameDefn) {
        this.gameDefn = gameDefn;
    }
    initialize() {
        var layout = this.gameDefn.layoutBuild();
        this.session = new Session(new Cursor(), layout);
    }
    update() {
        this.session.update();
    }
}
