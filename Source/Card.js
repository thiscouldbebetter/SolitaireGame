
function Card(defnName, isFaceUp)
{
	this.defnName = defnName;
	this.isFaceUp = isFaceUp;
}

{
	Card.prototype.defn = function()
	{
		var universe = Globals.Instance.universe;
		var cardDefns = universe.gameDefn.cardDefnSet.cardDefns;
		return cardDefns[this.defnName];
	}

	Card.prototype.size = function()
	{
		return this.defn().size();
	}
}
