function main()
{
	var universe = new Universe
	(
		GameDefn.solitaire()
	);

	Globals.Instance.initialize
	(
		new Coords(300, 300), //viewSizeInPixels,
		universe
	)
}
