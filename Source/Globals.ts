
class Globals
{
	static Instance: Globals = new Globals();

	display: Display;
	inputHelper: InputHelper;
	universe: Universe;

	initialize
	(
		viewSizeInPixels: Coords,
		universe: Universe
	): void
	{
		this.display = new Display();
		this.display.initialize(viewSizeInPixels);

		this.universe = universe;
		this.universe.initialize();

		this.inputHelper = new InputHelper();
		this.inputHelper.initialize();

		this.update();
	}

	update(): void
	{
		this.universe.update();
	}
}
