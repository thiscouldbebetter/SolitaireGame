"use strict";
class Card {
    constructor(defnName, isFaceUp) {
        this.defnName = defnName;
        this.isFaceUp = isFaceUp;
    }
    defn() {
        var universe = Globals.Instance.universe;
        var cardDefns = universe.gameDefn.cardDefnSet.cardDefnsByName;
        return cardDefns.get(this.defnName);
    }
    size() {
        return this.defn().size();
    }
}
