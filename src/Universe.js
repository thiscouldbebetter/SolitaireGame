
function Universe(gameDefn)
{
	this.gameDefn = gameDefn;
}
{
	Universe.prototype.initialize = function()
	{
		var layout = this.gameDefn.layoutBuild();

		this.session = new Session
		(
			new Cursor(),
			layout
		);
	}

	Universe.prototype.update = function()
	{
		this.session.update();
	}
}
