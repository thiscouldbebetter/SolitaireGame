
class CardStackDefn
{
	name: string;
	cardsSelectableMax: number;
	areFaceDownCardsSelectable: boolean;
	showTopCardAfterMove: boolean;
	spacing: Coords;
	dropCardStackFromCursorOnto: (c: Cursor, cs: CardStack) => void;


	constructor
	(
		name: string,
		cardsSelectableMax: number,
		areFaceDownCardsSelectable: boolean,
		showTopCardAfterMove: boolean,
		spacing: Coords,
		dropCardStackFromCursorOnto: (c: Cursor, cs: CardStack) => void
	)
	{
		this.name = name;
		this.cardsSelectableMax = cardsSelectableMax;
		this.areFaceDownCardsSelectable = areFaceDownCardsSelectable;
		this.showTopCardAfterMove = showTopCardAfterMove;
		this.spacing = spacing;
		this.dropCardStackFromCursorOnto = dropCardStackFromCursorOnto;
	}

	cardDefnSet(): CardDefnSet
	{
		return Globals.Instance.universe.gameDefn.cardDefnSet;
	}
}
