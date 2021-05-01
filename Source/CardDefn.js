
class CardDefn
{
	constructor(name, color)
	{
		this.name = name;
		this.color = color;
	}

	cardDefnSet()
	{
		return Globals.Instance.universe.gameDefn.cardDefnSet;
	}

	size()
	{
		return this.cardDefnSet().cardSizeInPixels;
	}
}
