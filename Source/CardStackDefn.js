"use strict";
class CardStackDefn {
    constructor(name, cardsSelectableMax, areFaceDownCardsSelectable, showTopCardAfterMove, spacing, dropCardStackFromCursorOnto) {
        this.name = name;
        this.cardsSelectableMax = cardsSelectableMax;
        this.areFaceDownCardsSelectable = areFaceDownCardsSelectable;
        this.showTopCardAfterMove = showTopCardAfterMove;
        this.spacing = spacing;
        this.dropCardStackFromCursorOnto = dropCardStackFromCursorOnto;
    }
    cardDefnSet() {
        return Globals.Instance.universe.gameDefn.cardDefnSet;
    }
}
