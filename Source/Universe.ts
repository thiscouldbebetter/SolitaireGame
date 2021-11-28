
class Universe
{
	gameDefn: GameDefn;
	session: Session;

	constructor(gameDefn: GameDefn)
	{
		this.gameDefn = gameDefn;
	}

	initialize(): void
	{
		var layout = this.gameDefn.layoutBuild();

		this.session = new Session
		(
			new Cursor(),
			layout
		);
	}

	update(): void
	{
		this.session.update();
	}
}
