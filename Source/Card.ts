
class Card
{
	defnName: string;
	isFaceUp: boolean;

	constructor(defnName: string, isFaceUp: boolean)
	{
		this.defnName = defnName;
		this.isFaceUp = isFaceUp;
	}

	defn(): CardDefn
	{
		var universe = Globals.Instance.universe;
		var cardDefns = universe.gameDefn.cardDefnSet.cardDefnsByName;
		return cardDefns.get(this.defnName);
	}

	size(): Coords
	{
		return this.defn().size();
	}
}
