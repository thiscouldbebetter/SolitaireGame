
class Session
{
	constructor(cursor, layout)
	{
		this.cursor = cursor;
		this.layout = layout;
	}

	update()
	{
		var inputHelper = Globals.Instance.inputHelper;
		var keyCodePressed = inputHelper.keyCodePressed;
		if (keyCodePressed != null)
		{
			var actions = Globals.Instance.universe.gameDefn.actions;
			var actionForKeyPressed = actions[keyCodePressed];
			if (actionForKeyPressed != null)
			{
				actionForKeyPressed.performForSession(this);
			}
			inputHelper.clear();
		}

		Globals.Instance.displayHelper.drawSession(this);
	}
}
