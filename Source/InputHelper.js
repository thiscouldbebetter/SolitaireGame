"use strict";
class InputHelper {
    clear() {
        this.keyCodePressed = null;
    }
    initialize() {
        document.body.onkeydown = this.handleEventKeyDown.bind(this);
    }
    // events
    handleEventKeyDown(event) {
        this.keyCodePressed = event.key;
        Globals.Instance.update();
    }
}
