"use strict";
class Layout {
    constructor(cardStacks) {
        this.cardStacks = cardStacks;
        this.cardStacksByName =
            new Map(this.cardStacks.map(x => [x.name, x]));
    }
    cardStackByName(name) {
        return this.cardStacksByName.get(name);
    }
}
