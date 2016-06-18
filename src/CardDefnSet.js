
function CardDefnSet(name, cardSizeInPixels, cardDefns)
{
	this.name = name;
	this.cardSizeInPixels = cardSizeInPixels;
	this.cardDefns = cardDefns;
	this.cardDefns.addLookups("name");
}

{
	CardDefnSet.standard = function()
	{
		var cardDefns = [];

		var suitCodes = [ "\u2663", "\u2666", "\u2665", "\u2660" ];
		var suitColors = [ "Black", "Red", "Red", "Black" ];

		var ranks = Rank.Instances._All;
		var ranksPerSuit = ranks.length;

		for (var s = 0; s < suitCodes.length; s++)
		{
			var suitCode = suitCodes[s];
			var suitColor = suitColors[s];

			for (var r = 0; r < ranksPerSuit; r++)
			{
				var rank = ranks[r];
				var cardDefnName = suitCode + rank.code;

				var cardDefn = new CardDefn
				(
					cardDefnName,
					suitColor
				);
				cardDefns.push(cardDefn);
			}
		}

		var returnValue = new CardDefnSet
		(
			"Standard",
			new Coords(24, 36), // cardSizeInPixels
			cardDefns
		);

		return returnValue;
	}
}
