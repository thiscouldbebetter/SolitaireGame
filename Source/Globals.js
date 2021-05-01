
class Globals
{
	static Instance = new Globals();

	initialize(viewSizeInPixels, universe)
	{
		this.displayHelper = new DisplayHelper();
		this.displayHelper.initialize(viewSizeInPixels);

		this.universe = universe;
		this.universe.initialize();

		this.inputHelper = new InputHelper();
		this.inputHelper.initialize();

		this.update();
	}

	update()
	{
		this.universe.update();
	}
}
