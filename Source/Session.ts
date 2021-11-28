
class Session
{
	cursor: Cursor;
	layout: Layout;

	constructor(cursor: Cursor, layout: Layout)
	{
		this.cursor = cursor;
		this.layout = layout;
	}

	update(): void
	{
		var inputHelper = Globals.Instance.inputHelper;
		var keyCodePressed = inputHelper.keyCodePressed;
		if (keyCodePressed != null)
		{
			var actionsByKeyCode =
				Globals.Instance.universe.gameDefn.actionsByKeyCode;
			var actionForKeyPressed =
				actionsByKeyCode.get(keyCodePressed);
			if (actionForKeyPressed != null)
			{
				actionForKeyPressed.performForSession(this);
			}
			inputHelper.clear();
		}

		Globals.Instance.display.drawSession(this);
	}
}
