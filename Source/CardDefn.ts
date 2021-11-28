
class CardDefn
{
	name: string;
	color: string;

	constructor(name: string, color: string)
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
