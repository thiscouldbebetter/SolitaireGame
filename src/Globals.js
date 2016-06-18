
function Globals()
{
	// do nothing
}

{
	// instance

	Globals.Instance = new Globals();

	// methods

	Globals.prototype.initialize = function(viewSizeInPixels, universe)
	{
		this.displayHelper = new DisplayHelper();
		this.displayHelper.initialize(viewSizeInPixels);

		this.universe = universe;
		this.universe.initialize();

		this.inputHelper = new InputHelper();
		this.inputHelper.initialize();

		this.update();
	}

	Globals.prototype.update = function()
	{
		this.universe.update();
	}
}
