
function CardDefn(name, color)
{
	this.name = name;
	this.color = color;
}

{
	CardDefn.prototype.cardDefnSet = function()
	{
		return Globals.Instance.universe.gameDefn.cardDefnSet;
	}

	CardDefn.prototype.size = function()
	{
		return this.cardDefnSet().cardSizeInPixels;
	}
}
